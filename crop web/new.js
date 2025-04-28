async function fetchAgricultureNews() {
    try {
        // Replace with your actual NewsAPI key
        const apiKey = '3147a9ad9dc44da9b9e0cd4b23ccaf75';
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=agriculture+farming&language=en&sortBy=publishedAt&apiKey=${apiKey}`
        );
        const data = await response.json();
        const newsContainer = document.getElementById('news-container');

        // Clear previous content
        newsContainer.innerHTML = '';

        // Sample data if API fails
        const sampleNews = [
            {
                title: "New AI Tool Helps Farmers Detect Crop Diseases",
                description: "A revolutionary AI system is helping farmers identify plant diseases early, saving millions in crop losses.",
                url: "#",
                urlToImage: "https://via.placeholder.com/150"
            },
            {
                title: "Sustainable Farming Practices Gain Traction",
                description: "Farmers worldwide are adopting sustainable practices to combat climate change and improve yields.",
                url: "#",
                urlToImage: "https://via.placeholder.com/150"
            },
            {
                title: "Global Wheat Prices Surge Amid Supply Concerns",
                description: "Adverse weather conditions have led to a spike in wheat prices, impacting global markets.",
                url: "#",
                urlToImage: "https://via.placeholder.com/150"
            }
        ];

        // Check if API response is valid
        let articles = sampleNews;
        if (data.status === 'ok' && data.articles && data.articles.length > 0) {
            articles = data.articles.slice(0, 6); // Limit to 6 articles
        } else {
            console.warn('No articles found, using sample data. API message:', data.message);
        }

        articles.forEach(article => {
            const newsCard = `
                <div class="col-md-4 news-card">
                    <div class="card shadow-sm">
                        <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${article.title}">
                        <div class="card-body">
                            <h5 class="card-title">${article.title}</h5>
                            <p class="card-text">${article.description || 'No description available'}</p>
                            <a href="${article.url}" class="btn btn-outline-success" target="_blank">Read More</a>
                        </div>
                    </div>
                </div>
            `;
            newsContainer.innerHTML += newsCard;
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        // Optionally display an error message to the user
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '<p class="text-danger">Failed to load news. Please try again later.</p>';
    }
}

// Fetch news on page load
window.onload = fetchAgricultureNews;