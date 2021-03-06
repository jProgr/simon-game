// Buttons
var game_buttons = [];
for (var i=0; i<=3; i++) { game_buttons.push(document.getElementById("b" + i)); }
var start_button = document.getElementById("start_game");
var strict_button = document.getElementById("strict_mode");

var sequence = [];
var game_running = false;
var player_sequence = [];
var strict_mode = false;

// Game logic

function start_game()
{
    game_running = true;
    sequence = [];
    player_sequence = [];
    generate_step();
    show_sequence();
}

function generate_step()
{ sequence.push((Math.random() * 4) | 0); }

function player_move()
{
    var button_pressed = parseInt(this.id.split("")[1],10);
    
    // If game is running, records button pressed, then check if the button is correct.
    // In case it is, checks if it was the last entry otherwise keeps going in accepting inputs
    // In case it is wrong, cleans player inputs and shows the full sequence again
    // In strict mode starts again
    if (record_player_sequence(button_pressed))
    {
        if (check_sequence(player_sequence[player_sequence.length - 1]))
        {
            if (player_sequence.length === sequence.length)
            {
                if (player_sequence.length === 20)
                { show_player_win(); setTimeout(start_game, 1000); }
                else
                {
                    generate_step();
                    show_sequence();
                    player_sequence = [];
                }
            }
        }
        else
        {
            if (strict_mode) { start_game(); }
            else
            {
                player_sequence = [];
                show_sequence();
            }
            show_wrong_move();
        }
    }
    
    console.log("Pressed: " + button_pressed);
    console.log("Sequence: " + sequence);
    console.log("Player: " + player_sequence);
}

function record_player_sequence(button_pressed)
{
    if (game_running)
    {
        player_sequence.push(button_pressed);
        return true;
    }
    
    return false;
}

function check_sequence(step_to_check)
{ return step_to_check === sequence[player_sequence.length - 1]; }

function toggle_strict_mode()
{ strict_mode = !strict_mode; }

// UI

function lightup(button)
{
    if (this.style) { button = this; }
    var base_color = button.style.backgroundColor;
    button.style.backgroundColor = "#997675";
    setTimeout(() => { button.style.backgroundColor = base_color; }, 300);
}

function show_sequence()
{
    sequence.forEach((step, index) => { setTimeout(() => { lightup(game_buttons[step]); }, 800 * (index + 1)); });
}

function strict_mode_indicator()
{
    strict_button.style.borderBottomColor = (strict_mode) ? "#997589" : "transparent";
}

function show_player_win()
{
    start_button.style.borderBottomColor = "#769975";
    start_button.style.borderTopColor = "#769975";
    setTimeout(() => { start_button.style.borderBottomColor = "transparent"; start_button.style.borderTopColor = "transparent"; }, 500);
}

function show_wrong_move()
{
    start_button.style.borderBottomColor = "#997675";
    setTimeout(() => { start_button.style.borderBottomColor = "transparent"; }, 500);
}

start_button.addEventListener("click", start_game, false);
strict_button.addEventListener("click", () => { toggle_strict_mode(); strict_mode_indicator(); }, false);
game_buttons.forEach((button) => { button.addEventListener("click", lightup, false); });
game_buttons.forEach((button) => { button.addEventListener("click", player_move, false); });
