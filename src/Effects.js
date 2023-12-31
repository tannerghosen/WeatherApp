export function Spin()
{
    document.addEventListener("click", (event) =>
    {
        if (event.target.matches("#weathericon"))
        {
            event.target.style.animation = "spin 1s linear";
            setTimeout(() => (event.target.style.animation = ""), 1000);
        }
    });
}