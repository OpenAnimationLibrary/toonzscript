a = new Image("F:\\input.0001.tif");
o = "F:\\converted.tlv"
counter = 1;
print("Input file:  " + a);
r = new ToonzRasterConverter();
b = r.convert(a);
newo = counter++ + o;
b.save(newo);
print("Output file:  " +  newo);