export function Spin()
{
    document.addEventListener("click", (event) =>  // add a click listener to the document
    {
        if (event.target.matches("#weathericon")) // if the element is a weathericon
        {
            event.target.style.animation = "spin 1s linear"; // spin it
            setTimeout(() => (event.target.style.animation = ""), 1000); // clear it's animation after 1 second
        }
    });
}