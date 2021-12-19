## Deployed App Link: 
https://still-cliffs-27435.herokuapp.com/example.html

## Documentation
https://still-cliffs-27435.herokuapp.com/documentation.html


# Getting Started
Download the CSS and JS files

segmented_progress_bar.js
segmented_progress_bar.css

Import the source files and JQuery

```
<link rel="stylesheet" href="segmented_progress_bar.css" />

<script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" ></script>

<script defer type="text/javascript" src="segmented_progress_bar.js" ></script>
```

Create a div for the Segmented Progress Bar in your html body. Give it an id and give the class "spb"

```
<div id="example_spb" class="spb"></div>
```

Initiliaze Segmented Progres Bar in your code

```
// Create the config object and set the preffered options
const spb_config = {
    length: 500,
    horizontal: true,
    segmentHoverColor: '#1ae300',
}

// Create the spb object by giving the div id and config object as arguments
const spb1 = spb('#example_spb', spb_config);

// Add segments and give their titles and percentages as arguments
spb1.addSegment('Uploading the setup files are to the server', 12);
spb1.addSegment('Extracting files', 15);
spb1.addSegment('Installing Dependencies', 18);
spb1.addSegment('Install the Ipsum software', 30);
spb1.addSegment('Delete setup files', 15);
spb1.addSegment('Run the server', 10);
```
