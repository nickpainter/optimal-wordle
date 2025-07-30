# Optimal Wordle

An Angular-based Wordle solver application by Dimitris Bertsimas (MIT) and Alex Paskov.

## 🚀 Live Demo

Visit the live application: [https://nickpainter.github.io/optimal-wordle/](https://nickpainter.github.io/optimal-wordle/)

## 📖 About

This application presents an exact and interpretable solution to Wordle, based on research by:
- **Dimitris Bertsimas** - Boeing Professor of Operations Research, MIT
- **Alex Paskov** - MIT PhD Candidate, Columbia '21 Salutatorian

## 🛠️ Hosting Options

### GitHub Pages (Automatic Deployment)

This repository is configured to automatically deploy to GitHub Pages when changes are pushed to the `main` branch.

**Setup:**
1. Go to your repository Settings → Pages
2. Under "Source", select "GitHub Actions"
3. The site will be available at `https://yourusername.github.io/optimal-wordle/`

### Docker Hosting

You can also host this application using Docker for local development or custom deployment.

**Prerequisites:**
- Docker
- Docker Compose

**Quick Start:**
```bash
# Clone the repository
git clone https://github.com/nickpainter/optimal-wordle.git
cd optimal-wordle

# Build and run with Docker Compose
docker-compose up -d

# The application will be available at http://localhost:8080
```

**Manual Docker Commands:**
```bash
# Build the image
docker build -t optimal-wordle .

# Run the container
docker run -d -p 8080:80 --name optimal-wordle-app optimal-wordle
```

**Stop the application:**
```bash
# Using Docker Compose
docker-compose down

# Or stop the container directly
docker stop optimal-wordle-app
docker rm optimal-wordle-app
```

## 🏗️ Project Structure

```
optimal-wordle/
├── index.html              # Main HTML file
├── Wordle_files/           # Assets directory
│   ├── main.js            # Main JavaScript bundle
│   ├── polyfills.js       # Browser polyfills
│   ├── runtime.js         # Angular runtime
│   └── styles.css         # Compiled styles
├── .github/workflows/     # GitHub Actions
│   └── deploy.yml         # Pages deployment workflow
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose configuration
├── nginx.conf            # Nginx server configuration
└── README.md             # This file
```

## 🔧 Development

This is a compiled Angular application. The source files are bundled into the `Wordle_files/` directory.

## 📄 Research Paper

The application is based on the research paper "An Exact and Interpretable Solution to Wordle". The paper should be available in the `assets/` directory once added.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

- **Dimitris Bertsimas** - Boeing Professor of Operations Research, MIT
- **Alex Paskov** - MIT PhD Candidate, Columbia '21 Salutatorian

---

Built with ❤️ using Angular and hosted on GitHub Pages
