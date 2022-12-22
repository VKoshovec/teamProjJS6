
const toTop = document.querySelector("#to-top");

toTop.hidden = false;
window.addEventListener("scroll", () => {
toTop.hidden = scrollY > 200 ? false : true;
});

toTop.onclick = () => {
window.scrollTo(0, 0);
};

document.querySelector("#to-top").addEventListener("click", function () {

    let toTopInterval = setInterval(function(){

        let supportedScrollTop = document.body.scrollTop > 0 ? document.body : document.documentElement;

        if (supportedScrollTop.scrollTop > 0) {
            supportedScrollTop.scrollTop = supportedScrollTop.scrollTop - 50;
            
        }

        if (supportedScrollTop.scrollTop < 1) {
            clearInterval(toTopInterval);
        }

    }, 10);

}, false);
