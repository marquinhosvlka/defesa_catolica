window.addEventListener('scroll', function() {
    var footer = document.querySelector('.copyright-bar');
    var windowHeight = window.innerHeight;
    var fullHeight = document.body.scrollHeight;
    var scrollPosition = window.scrollY || window.pageYOffset || document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
    
    if (scrollPosition + windowHeight >= fullHeight) {
        footer.style.display = 'block';
    } else {
        footer.style.display = 'none';
    }
});
