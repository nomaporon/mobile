<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Food</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    </head>
    <body>
        <h1>Food Name</h1>
        <div class='foods'>
            @foreach ($foods as $food)
                <div class='food'>
                    <h2 class='food_name'>{{ $food->name }}</h2>
                    <p class='price'>{{ $food->unit_price }}</p>
                </div>
            @endforeach
        </div>
    </body>
</html>