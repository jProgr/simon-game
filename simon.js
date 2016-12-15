var b1 = document.getElementById("b1");
b1.addEventListener("click", lightup, false);

//UI

function lightup()
{
    var base_color = this.style.backgroundColor;
    this.style.backgroundColor = "#997675";
    setTimeout(() => { this.style.backgroundColor = base_color; }, 200);
}