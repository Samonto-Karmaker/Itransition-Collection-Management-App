const prod = {
    API_URL: 'https://itransition-collection-management-app-19za.onrender.com'
}

const dev = {
    API_URL: 'http://localhost:8080'
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;