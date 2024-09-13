import sys
import os
import shutil
from pdf2image import convert_from_path, pdfinfo_from_path
from PyQt5.QtWidgets import (
    QApplication, QMainWindow, QGraphicsScene, QGraphicsView,
    QGraphicsPixmapItem, QVBoxLayout, QWidget, QPushButton, QHBoxLayout,
    QFileDialog, QMessageBox, QProgressBar
)
from PyQt5.QtGui import QPixmap, QPainter, QImage
from PyQt5.QtCore import Qt, QThread, pyqtSignal, QObject
from PIL import Image

def pil_image_to_pixmap(pil_image):
    """Convert PIL Image to QPixmap without using ImageQt."""
    # Convert PIL image to RGBA format if necessary
    if pil_image.mode != "RGBA":
        pil_image = pil_image.convert("RGBA")
    data = pil_image.tobytes("raw", "RGBA")
    qimage = QImage(data, pil_image.width, pil_image.height, QImage.Format_RGBA8888)
    pixmap = QPixmap.fromImage(qimage)
    return pixmap

class WorkerSignals(QObject):
    finished = pyqtSignal()
    error = pyqtSignal(str)
    progress = pyqtSignal(int)
    result = pyqtSignal(list, list)  # Now passes two lists: pixmaps and pil_images

class PDFLoader(QThread):
    def __init__(self, file_name, thumb_width, parent=None):
        super().__init__(parent)
        self.file_name = file_name
        self.thumb_width = thumb_width
        self.signals = WorkerSignals()

    def run(self):
        try:
            # Increase DPI for higher resolution
            pages = convert_from_path(self.file_name, dpi=200)  # Adjust dpi as needed
            total_pages = len(pages)
            pixmaps = []
            pil_images = []  # Store PIL images for export
            for index, page in enumerate(pages):
                # Optionally, resize images to a larger size for better quality
                ratio = page.height / page.width
                desired_width = self.thumb_width
                desired_height = int(desired_width * ratio)

                # Use resize instead of thumbnail for better quality
                page = page.resize((desired_width, desired_height), Image.LANCZOS)

                # Store PIL image for export
                pil_images.append(page.copy())

                # Convert PIL Image to QPixmap
                pixmap = pil_image_to_pixmap(page)
                pixmaps.append(pixmap)

                # Emit progress signal
                progress = int((index + 1) / total_pages * 100)
                self.signals.progress.emit(progress)

            # Emit result signal
            self.signals.result.emit(pixmaps, pil_images)
            self.signals.finished.emit()

        except Exception as e:
            self.signals.error.emit(str(e))

class PDFViewer(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("PDF Viewer")
        self.zoom_level = 1.0

        # Initialize the scene and view
        self.scene = QGraphicsScene()
        self.view = QGraphicsView(self.scene)
        self.view.setRenderHint(QPainter.Antialiasing)
        self.view.setVerticalScrollBarPolicy(Qt.ScrollBarAsNeeded)
        self.view.setHorizontalScrollBarPolicy(Qt.ScrollBarAsNeeded)

        # Add Load PDF button
        load_pdf_button = QPushButton("Load PDF")
        load_pdf_button.clicked.connect(self.load_pdf)

        # Add Export button
        export_button = QPushButton("Export")
        export_button.clicked.connect(self.export_grid)

        # Add Zoom In/Out buttons
        zoom_in_button = QPushButton("Zoom In")
        zoom_in_button.clicked.connect(self.zoom_in)
        zoom_out_button = QPushButton("Zoom Out")
        zoom_out_button.clicked.connect(self.zoom_out)

        # Add Restart button
        restart_button = QPushButton("Restart")
        restart_button.clicked.connect(self.restart_program)

        # Layout setup
        button_layout = QHBoxLayout()
        button_layout.addWidget(load_pdf_button)
        button_layout.addWidget(export_button)
        button_layout.addWidget(zoom_in_button)
        button_layout.addWidget(zoom_out_button)
        button_layout.addWidget(restart_button)

        main_layout = QVBoxLayout()
        main_layout.addLayout(button_layout)
        main_layout.addWidget(self.view)

        container = QWidget()
        container.setLayout(main_layout)
        self.setCentralWidget(container)

        # Grid parameters
        self.cols = 2          # Reduce columns to display larger images
        self.spacing = 20      # Increase spacing for larger images
        self.thumb_width = 600 # Increase thumbnail width for higher resolution

        # Progress indicator
        self.progress_bar = QProgressBar()
        self.statusBar().addPermanentWidget(self.progress_bar)
        self.progress_bar.setVisible(False)

        # Current worker thread
        self.worker = None

        # Store images and positions for export
        self.pil_images = []
        self.image_positions = []

    def load_pdf(self):
        """Open a file dialog to load a PDF file."""
        options = QFileDialog.Options()
        options |= QFileDialog.ReadOnly
        file_name, _ = QFileDialog.getOpenFileName(
            self,
            "Open PDF File",
            "",
            "PDF Files (*.pdf);;All Files (*)",
            options=options
        )
        if file_name:
            try:
                # Get PDF info to find out the number of pages
                info = pdfinfo_from_path(file_name)
                num_pages = info.get('Pages', 0)

                # Check if the number of pages exceeds the limit
                if num_pages > 100:
                    reply = QMessageBox.question(
                        self,
                        "Large PDF Detected",
                        f"The PDF has {num_pages} pages. Processing may take a long time and consume significant memory.\nDo you want to proceed?",
                        QMessageBox.Yes | QMessageBox.No,
                        QMessageBox.No
                    )
                    if reply == QMessageBox.No:
                        return

                # Disable UI elements
                self.set_ui_enabled(False)
                # Clear the scene
                self.scene.clear()
                # Reset zoom level
                self.zoom_level = 1.0
                self.view.resetTransform()
                # Show progress bar
                self.progress_bar.setValue(0)
                self.progress_bar.setVisible(True)

                # Start worker thread
                self.worker = PDFLoader(file_name, self.thumb_width)
                self.worker.signals.progress.connect(self.update_progress)
                self.worker.signals.result.connect(self.display_images)
                self.worker.signals.finished.connect(self.loading_finished)
                self.worker.signals.error.connect(self.loading_error)
                self.worker.start()

            except Exception as e:
                QMessageBox.critical(self, "Error", f"Failed to load PDF:\n{e}")

    def update_progress(self, value):
        self.progress_bar.setValue(value)

    def display_images(self, pixmaps, pil_images):
        self.pil_images = pil_images  # Store PIL images for export
        self.image_positions = []     # Reset image positions
        row = 0
        col = 0
        for pixmap in pixmaps:
            # Create a QGraphicsPixmapItem and add to scene
            item = QGraphicsPixmapItem(pixmap)
            x = col * (self.thumb_width + self.spacing)
            y = row * (pixmap.height() + self.spacing)
            item.setPos(x, y)
            self.scene.addItem(item)

            # Store position for export
            self.image_positions.append((x, y, pixmap.width(), pixmap.height()))

            # Update row and column indices
            col += 1
            if col >= self.cols:
                col = 0
                row += 1

        # Update the scene's sceneRect
        self.scene.setSceneRect(self.scene.itemsBoundingRect())

    def loading_finished(self):
        # Hide progress bar
        self.progress_bar.setVisible(False)
        # Enable UI elements
        self.set_ui_enabled(True)

    def loading_error(self, error_message):
        # Hide progress bar
        self.progress_bar.setVisible(False)
        # Enable UI elements
        self.set_ui_enabled(True)
        # Show error message
        QMessageBox.critical(self, "Error", f"Failed to load PDF:\n{error_message}")

    def set_ui_enabled(self, enabled):
        self.menuBar().setEnabled(enabled)
        self.view.setEnabled(enabled)

    def zoom_in(self):
        """Zoom in by increasing the scale factor."""
        self.zoom_level *= 1.25
        self.view.resetTransform()
        self.view.scale(self.zoom_level, self.zoom_level)

    def zoom_out(self):
        """Zoom out by decreasing the scale factor."""
        self.zoom_level /= 1.25
        self.view.resetTransform()
        self.view.scale(self.zoom_level, self.zoom_level)

    def export_grid(self):
        """Export the grid of images to a single PNG image."""
        if not self.pil_images or not self.image_positions:
            QMessageBox.warning(self, "Warning", "No images to export.")
            return

        # Create a directory for temporary images
        temp_dir = os.path.join(os.getcwd(), "temp_images")
        if not os.path.exists(temp_dir):
            os.makedirs(temp_dir)

        # Save individual images to temporary files
        temp_files = []
        for index, image in enumerate(self.pil_images):
            temp_file = os.path.join(temp_dir, f"page_{index + 1}.png")
            image.save(temp_file, "PNG")
            temp_files.append(temp_file)

        # Calculate the size of the combined image
        total_width = 0
        total_height = 0
        max_row_heights = []
        col_widths = []

        # Determine max widths and heights per row and column
        for index, (x, y, width, height) in enumerate(self.image_positions):
            row = index // self.cols
            col = index % self.cols
            if len(max_row_heights) <= row:
                max_row_heights.append(0)
            if len(col_widths) <= col:
                col_widths.append(0)
            if height > max_row_heights[row]:
                max_row_heights[row] = height
            if width > col_widths[col]:
                col_widths[col] = width

        total_width = sum(col_widths) + (self.cols - 1) * self.spacing
        total_height = sum(max_row_heights) + (len(max_row_heights) - 1) * self.spacing

        # Create a new image with the calculated size
        combined_image = Image.new("RGBA", (total_width, total_height), (255, 255, 255, 0))

        # Paste images into the combined image
        current_y = 0
        index = 0
        for row_height in max_row_heights:
            current_x = 0
            for col_width in col_widths:
                if index < len(temp_files):
                    image = Image.open(temp_files[index])
                    combined_image.paste(image, (current_x, current_y))
                    image.close()
                    index += 1
                current_x += col_width + self.spacing
            current_y += row_height + self.spacing

        # Ask user where to save the combined image
        options = QFileDialog.Options()
        file_name, _ = QFileDialog.getSaveFileName(
            self,
            "Save Image",
            "",
            "PNG Files (*.png);;All Files (*)",
            options=options
        )
        if file_name:
            try:
                combined_image.save(file_name, "PNG")
                QMessageBox.information(self, "Success", "Image saved successfully.")
            except Exception as e:
                QMessageBox.critical(self, "Error", f"Failed to save image:\n{e}")

        # Clean up temporary files and directory
        try:
            shutil.rmtree(temp_dir)
        except Exception as e:
            print(f"Failed to delete temp directory: {e}")

    def restart_program(self):
        """Restart the current program."""
        # Prompt the user to confirm restart
        reply = QMessageBox.question(
            self,
            "Restart Program",
            "Are you sure you want to restart the program?",
            QMessageBox.Yes | QMessageBox.No,
            QMessageBox.No
        )
        if reply == QMessageBox.Yes:
            # Ensure any worker threads are stopped
            if self.worker and self.worker.isRunning():
                self.worker.terminate()
                self.worker.wait()
            # Restart the program
            python = sys.executable
            os.execl(python, python, *sys.argv)

    def closeEvent(self, event):
        # Ensure the worker thread is stopped when the application closes
        if self.worker and self.worker.isRunning():
            self.worker.terminate()
            self.worker.wait()
        event.accept()

if __name__ == '__main__':
    app = QApplication(sys.argv)
    viewer = PDFViewer()
    viewer.show()
    sys.exit(app.exec_())
