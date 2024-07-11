a = new Image("F:\\input.0001.tif");
o = "F:\\converted.tlv"
print("Input file:  " + a);
r = new ToonzRasterConverter();
b = r.convert(a);
b.save(o);
print("Output file:  " + o);
z = new Level(o);
view(z);