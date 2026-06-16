import './globals.css';
import Navbar from '../components/Navbar';
import AudioPlayer from '../components/AudioPlayer';
import Preloader from '../components/Preloader';
import CustomCursor from '../components/CustomCursor';
import BackgroundCanvas from '../components/BackgroundCanvas';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Pratik G - Data Scientist Portfolio',
  description: 'Turning raw data into meaningful decisions through code, curiosity, and leadership.',
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
