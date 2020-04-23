const size = 500;

function getColor(name) {
    switch(name) {
        case "Steel":
            return { "r": 0.392, "g": 0.392, "b": 0.392, "a": 1.0 }
        case "Silver":
            return { "r": 0.612, "g": 0.612, "b": 0.612, "a": 1.0 }
        case "White":
            return { "r": 0.847, "g": 0.847, "b": 0.847, "a": 1.0 }
        case "Brown":
            return { "r": 0.451, "g": 0.357, "b": 0.282, "a": 1.0 }
        case "Tan":
            return { "r": 0.624, "g": 0.494, "b": 0.416, "a": 1.0 }
        case "Khaki":
            return { "r": 0.8, "g": 0.663, "b": 0.58, "a": 1.0 }
        case "Sage":
            return { "r": 0.459, "g": 0.486, "b": 0.349, "a": 1.0 }
        case "Olive":
            return { "r": 0.592, "g": 0.651, "b": 0.431, "a": 1.0 }
        case "Drab":
            return { "r": 0.718, "g": 0.792, "b": 0.549, "a": 1.0 }
        case "Forest":
            return { "r": 0.22, "g": 0.478, "b": 0.278, "a": 1.0 }
        case "Green":
            return { "r": 0.353, "g": 0.678, "b": 0.439, "a": 1.0 }
        case "Sea Foam": 
            return { "r": 0.533, "g": 0.804, "b": 0.569, "a": 1.0 }
        case "Teal":
            return { "r": 0.2, "g": 0.533, "b": 0.518, "a": 1.0 }
        case "Aqua":
            return { "r": 0.294, "g": 0.698, "b": 0.69, "a": 1.0 }
        case "Cyan":
            return { "r": 0.498, "g": 0.863, "b": 0.847, "a": 1.0 }
        case "Blue":
            return { "r": 0.247, "g": 0.376, "b": 0.514, "a": 1.0 }
        case "Cobalt":
            return { "r": 0.396, "g": 0.506, "b": 0.647, "a": 1.0 }
        case "Ice":
            return { "r": 0.553, "g": 0.69, "b": 0.851, "a": 1.0 }
        case "Violet":
            return { "r": 0.373, "g": 0.365, "b": 0.553, "a": 1.0 }
        case "Orchid":
            return { "r": 0.494, "g": 0.478, "b": 0.718, "a": 1.0 }
        case "Lavender":
            return { "r": 0.651, "g": 0.639, "b": 0.867, "a": 1.0 }
        case "Maroon":
            return { "r": 0.635, "g": 0.263, "b": 0.263, "a": 1.0 }
        case "Brick":
            return { "r": 0.827, "g": 0.275, "b": 0.275, "a": 1.0 }
        case "Rose":
            return { "r": 0.918, "g": 0.58, "b": 0.58, "a": 1.0 }
        case "Rust":
            return { "r": 0.706, "g": 0.345, "b": 0.169, "a": 1.0 }
        case "Coral":
            return { "r": 0.925, "g": 0.49, "b": 0.259, "a": 1.0 }
        case "Peach":
            return { "r": 0.922, "g": 0.678, "b": 0.537, "a": 1.0 }
        case "Gold":
            return { "r": 0.698, "g": 0.518, "b": 0.188, "a": 1.0 }
        case "Yellow":
            return { "r": 0.871, "g": 0.769, "b": 0.31, "a": 1.0 }
        case "Butter":
            return { "r": 0.945, "g": 0.922, "b": 0.482, "a": 1.0 }
        default:
        case "Transparent":
            return { "r": 0.0, "g": 0.0, "b": 0.0, "a": 0.0 }
    }
}

EB_Image_Data = null;
EP_Image_Data = null;
ES_Image_Data = null;

const ELayer_Background = "Background";
const ELayer_Primary = "Primary";
const ELayer_Secondary = "Secondary";

function loadedImage() {
    var form = document.forms["emblem_picker"];
    ELayer = ELayer_Background

    if (this.src.substring(this.src.lastIndexOf('/') + 1).indexOf("P") != -1) {
        ELayer = ELayer_Primary
    }
    else if (this.src.substring(this.src.lastIndexOf('/') + 1).indexOf("S") != -1) {
        ELayer = ELayer_Secondary
    }

    var canvas;

    switch(ELayer) {
        case ELayer_Background:
            canvas = document.getElementById("background_canvas")
            break;
        case ELayer_Primary:
            canvas = document.getElementById("primary_canvas")
            break;
        case ELayer_Secondary:
            canvas = document.getElementById("secondary_canvas")
            break;
    }

    context = canvas.getContext('2d');
    context.clearRect(0, 0, size, size);
    canvas.width = size;
    canvas.height = size;
    context.drawImage(this, 0, 0, size, size);
    var imageData = context.getImageData(0, 0, size, size);
    var data = imageData.data;
    var color;

    switch(ELayer) {
        case ELayer_Background:
            color = getColor(form.elements["color_background"].value);
            break;
        case ELayer_Primary:
            color = getColor(form.elements["color_primary"].value);
            break;
        case ELayer_Secondary:
            color = getColor(form.elements["color_secondary"].value);
            break;
    }

    for(var p = 0, len = data.length; p < len; p+=4) {
        if(data[p+3] == 0)
           continue;
        data[p + 0] = color.r * 255;
        data[p + 1] = color.g * 255;
        data[p + 2] = color.b * 255;
        data[p + 3] = (data[p + 3] / 255) * (color.a * 255);
    }

    context.putImageData(imageData, 0, 0);


    switch(ELayer) {
        case ELayer_Background:
            EB_Image_Data = canvas.toDataURL();
            break;
        case ELayer_Primary:
            EP_Image_Data = canvas.toDataURL();
            break;
        case ELayer_Secondary:
            ES_Image_Data = canvas.toDataURL();
            break;
    }

    if (EB_Image_Data != null && EP_Image_Data != null && ES_Image_Data != null) {
        renderEmblem();
    }
}

function updateEmblem() {
    var form = document.forms["emblem_picker"];
    var primaryIndex = form.elements["emblem"].value;
    var backgroundIndex = form.elements["background"].value;
    var primaryColor = form.elements["color_primary"].value;
    var secondaryColor = form.elements["color_secondary"].value;
    var backgroundColor = form.elements["color_background"].value;

    var params = {
        p: primaryIndex,
        b: backgroundIndex,
        pc: primaryColor,
        sc: secondaryColor,
        bc: backgroundColor
    };
    
    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');

    history.pushState({},"Image updated.", window.location.href.substring(0, window.location.href.indexOf("?")) + "?" + query)

    EB_Image_Data = null;
    EP_Image_Data = null;
    ES_Image_Data = null;

    var EB_image = new Image;
    var EP_image = new Image;
    var ES_image = new Image;

    EB_image.onload = loadedImage;
    EP_image.onload = loadedImage;
    ES_image.onload = loadedImage;

    EB_image.src = "./img/emblems/EB_" + backgroundIndex + ".png";
    EP_image.src = "./img/emblems/E_" + primaryIndex + "_P.png";
    ES_image.src = "./img/emblems/E_" + primaryIndex + "_S.png"
}

function saveImage() {
    var canvas = document.getElementById('emblemCanvas');
    window.open(canvas.toDataURL('image/png'));
    var gh = canvas.toDataURL('png');

    var a  = document.createElement('a');
    a.href = gh;
    a.download = 'image.png';

    a.click()
}

function renderEmblem() {
    var EB_image = new Image;
    var EP_image = new Image;
    var ES_image = new Image;

    EB_image.src = EB_Image_Data;
    EP_image.src = EP_Image_Data;
    ES_image.src = ES_Image_Data;

    var canvas = document.getElementById('emblemCanvas');
    canvas.width = size;
    canvas.height = size;
    context = canvas.getContext('2d');

    context.clearRect(0, 0, size, size);

    context.drawImage(EB_image, 0, 0, size, size);
    context.drawImage(ES_image, 0, 0, size, size);
    context.drawImage(EP_image, 0, 0, size, size);

    
    // save canvas image as data url (png format by default)
    var dataURL = canvas.toDataURL();

    // set canvasImg image src to dataURL
    // so it can be saved as an image
    document.getElementById('emblemImg').src = dataURL;
}

const urlParams = new URLSearchParams(window.location.search);

var form = document.forms["emblem_picker"];

var p = urlParams.get("p");
var b = urlParams.get("b");
var pc = urlParams.get("pc");
var sc = urlParams.get("sc");
var bc = urlParams.get("bc");

if(p) {
    form.elements["emblem"].value = p;
}
if(b) {
    form.elements["background"].value = b;
}
if(pc) {
    form.elements["color_primary"].value = pc;
}
if(sc) {
    form.elements["color_secondary"].value = sc;
}
if(bc) {
    form.elements["color_background"].value = bc;
}

document.addEventListener("DOMContentLoaded", function(event) { 
    updateEmblem();
  });
