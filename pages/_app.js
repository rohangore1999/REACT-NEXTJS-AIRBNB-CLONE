import '../styles/globals.css'

// for progress bar
import ProgressBar from "@badrap/bar-of-progress";

// Router to track the progress of routes change
import Router from 'next/router';

const progress = new ProgressBar({
  // The size (height) of the progress bar.
  // Numeric values get converted to px.
  size: 4,

  // Color of the progress bar.
  // Also used for the glow around the bar.
  color: "#FE595E",

  // Class name used for the progress bar element.
  className: "z-50",

  // How many milliseconds to wait before the progress bar
  // animation starts after calling .start().
  delay: 100,
});

// whenever the routes change it will dispatch the action which next js knows about
Router.events.on('routeChangeStart', progress.start) //when routeChangeStart >>> start the progress
Router.events.on('routeChangeComplete', progress.finish) //when routeChangeComplete >>> finish the progress
Router.events.on('routeChangeError', progress.finish) //when routeChangeError >>> then also finish the progress



function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
