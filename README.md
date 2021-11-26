# educative-downloader
To download educative courses

## Purpose
To download educative courses, if you have premium account.

## How it works
It is written on chromium `puppeteer` library. Its not `headless`.

## Why not fully Automated (Not headless)
I tried fully automated version too. It worked pretty well.
But, educative guys are very smart. Each time, I logged-in, they sent a code on my email.

So, headless will not work.

## Solution
I opened up a browser, user need to put their login credentials manually, check email manually (If any).
In `app.js`, user need to pass the course URL. See a sample URL.

## Download
Currently, it is downloading as html. Download pdf is not an option in non-headless mode.

## How to run
 
```
# after 
# npm i

node app.js
```
