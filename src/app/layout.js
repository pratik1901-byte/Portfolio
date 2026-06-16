import './globals.css';
import Navbar from '../components/Navbar';
import AudioPlayer from '../components/AudioPlayer';
import Preloader from '../components/Preloader';
import CustomCursor from '../components/CustomCursor';
import BackgroundCanvas from '../components/BackgroundCanvas';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Pratik G - Data Scientist Portfolio',
  description: 'Turning raw data into meaningful decisions through code, curiosity, and leadership. B.E. in Information Science and AIESEC leader.',
  keywords: ['Pratik G', 'Data Scientist', 'Information Science Engineer', 'Python Developer', 'Machine Learning', 'Data Analysis', 'SQL', 'AIESEC', 'Portfolio', 'Bengaluru'],
  authors: [{ name: 'Pratik G' }],
  creator: 'Pratik G',
  openGraph: {
    title: 'Pratik G - Data Scientist & Engineer',
    description: 'Turning raw data into meaningful decisions through code, curiosity, and leadership.',
    url: 'https://pratikportfolio.pythonanywhere.com',
    siteName: 'Pratik G Portfolio',
    images: [
      {
        url: 'https://pratikportfolio.pythonanywhere.com/static/img/pratik.jpeg',
        width: 800,
        height: 800,
        alt: 'Pratik G - Data Scientist',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratik G - Data Scientist Portfolio',
    description: 'Turning raw data into meaningful decisions through code, curiosity, and leadership.',
    images: ['https://pratikportfolio.pythonanywhere.com/static/img/pratik.jpeg'],
  },
  verification: {
    google: 'TX4IU0yOrYgn5Fn3c0Ep_KJI3TcgAsvph-Qt2u-nv5E',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <CustomCursor />
        <BackgroundCanvas />
        <Preloader />
        <div className="noise-overlay"></div>
        <Navbar />
        {children}
        <Footer />
        <AudioPlayer />
      </body>
    </html>
  );
}
