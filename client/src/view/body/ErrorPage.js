import { Image } from "react-bootstrap"

const ErrorPage = () => {
    return (
        <div 
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                width: "100vw",
            }}
        >
            <Image 
                style={{ 
                    width: "100%",
                    maxWidth: "500px",
                    height: "auto",
                    margin: "auto",
                }}
                src="page-not-found.jpg" 
                alt="page-not-found"
            />
        </div>
    )
}

export default ErrorPage