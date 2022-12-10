(function() {
    let startTime = (new Date).getTime();
    window.addEventListener('load', function() {
        let endTime = (new Date).getTime();
        document.querySelector("#load_time").textContent = "Page load time is " + (endTime - startTime) / 1000 + " Seconds";
    });
})();

window.onload = function() {
    let links = document.getElementsByClassName("nav_element");
    for (let i = 0; i < links.length; i++)
    {
        if (links[i].href === window.location.href)
        {
            links[i].classList.add("nav_element_active");
        }
    }
}