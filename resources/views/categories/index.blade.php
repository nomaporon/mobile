<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <title>Food</title>
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    </head>
    <body>
        <div class="category">
            @foreach($categories as $category)
                <h2 class='category_name'>{{ $category->name }}</h2>
                    <h4 class='food'>
                        @foreach($category->foods as $food)
                            {{ $food->name }}
                            {{ $food->unit_price }}
                        @endforeach
                    </h4>
            @endforeach
        </div>
        <select name="category[name]">
            @foreach($categories as $category)
                <option value="{{ $category->id }}">{{ $category->name }}</option>
            @endforeach
        </select>
    </body>
</html>