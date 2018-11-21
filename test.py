import sys
from lxml import etree

xsltfile = '/home/sunil/git/xcos_on_cloud/webapp/finalmodsheet.xsl'

xslt = etree.parse(xsltfile)

transform = etree.XSLT(xslt)

if len(sys.argv) < 2:
    print("Usage: %s xmlfile" % sys.argv[0])
    sys.exit(0)

xmlfile = sys.argv[1]

xml1 = etree.parse(xmlfile)

xml2 = transform(xml1)
print(type(xml2))
with open('xml2', 'w') as xml2file:
    print(xml2, file=xml2file)
