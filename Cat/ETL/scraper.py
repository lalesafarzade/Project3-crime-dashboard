from bs4 import BeautifulSoup
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import ssl
import certifi
from urllib import request as req
import requests

#ssl._create_default_https_context = ssl._create_unverified_context

def data_scraper(url,html_part='div',id='widget_362_0_197'):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    quotes = soup.find_all(html_part, id=id)  
    lis=quotes[0].find_all('li')
    Download_url=[]
    for li in lis:
        link=li.find("a")
        href=link["href"]
        Download_url.append("https://www.atlantapd.org"+href)
        for i in range(len(Download_url)):
            try:
                local_file = f'.../Resources/cobra{i}.zip'
                req.urlretrieve(Download_url[i], local_file)
            except:
                print("something is wrong :( ")
                
    return Download_url

data_scraper('https://www.atlantapd.org/i-want-to/crime-data-downloads')