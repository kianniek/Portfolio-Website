// Function to store scroll position
    function saveScrollPosition() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        localStorage.setItem('scrollPosition', scrollPosition);
    }

    // Function to restore scroll position
    function restoreScrollPosition() {
        const scrollPosition = localStorage.getItem('scrollPosition');
        if (scrollPosition) {
            window.scrollTo(0, scrollPosition);
        }
    }

    // Add event listener for scroll
    window.addEventListener('scroll', saveScrollPosition);

    // Restore scroll position on page load
    window.addEventListener('load', restoreScrollPosition);