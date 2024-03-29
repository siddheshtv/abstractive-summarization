# Abstractive Text Summarization from Videos

An abstractive summarization web application that uses Google T5-small fine-tuned model to generate summaries from videos. You can simply paste the YouTube video link into the input section or upload an mp4 file.

## Why?

- Third-part summarization tools is pain in the a\*\*
- Almost all tools are pretty expensive and the ones that are available are not very great.
- Privacy concerns and data sharing (ex: ChatGPT)
- I couldn't find a simplified solution and had an engineering mindset. So made one myself. Would be happy if you use it or contribute to it :)

## 🚀 Quickstart

### Start by cloning this repository

```git
git clone https://github.com/siddheshtv/abstractive-summarization.git
```

### Next, `cd` into the <strong>backend</strong> directory and install the required libraries

```bash
pip install -r requirements.txt
```

### Run the following command to start the backend server that uses `FastAPI` and `uvicorn`

```bash
uvicorn main:app --reload
```

Hint: To check if the backend server is up and running, you can send a `GET` request to `http://0.0.0.0:8000/`. This will tell you if the server is running, and if not, it will throw an error. 4. Next, `cd` into the <strong>frontend</strong> directory and run:

```bash
npm install
```

### Finally, start the react frontend using:

```bash
npm start
```

## 🤝 Contributing

### Clone the repo

```bash
git clone https://github.com/siddheshtv/abstractive-summarization.git
```

### Install the requirements

```bash
$backend> pip install -r requirements.txt
$frontend> npm install
```

### Issues to solve at this point

- Developing a better transcription model
- Developing a better "abstractive" summarization model
- Enhance the user interface
- Using custom user authentication (instead of current: `Auth0`)
- Anything else that might seem interesting to you (incl. code optimization, handling concurrent requests, parallization, etc.)

### Submit a pull request

If you'd like to contribute, please fork the repository and open a pull request to the `main` branch.
