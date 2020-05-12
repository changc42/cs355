from bs4 import BeautifulSoup
import sys

soup = BeautifulSoup(sys.argv[1])
print(soup.get_text())

