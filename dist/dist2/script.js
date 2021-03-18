// Sketchfab Viewer API: Save current render as image
var version = '1.9.0';
var iframe = document.getElementById('api-frame');
var uid = '8914555497544661a21482bab475f8fd';

var client = new window.Sketchfab(version, iframe);

var error = function () {
    console.error('Sketchfab API error');
};

var success = function (api) {
    api.start(function () {
        document.getElementById('screenshot').addEventListener('click', function () {
            api.getScreenShot(1200, 800, 'image/png', function (err, result) {
                var anchor = document.createElement('a');
                anchor.href = result;
                anchor.download = 'screenshot.png';
                anchor.innerHTML = '<img width="100" height="100" src=' + result + '>descargar';
                document.getElementById('controls').appendChild(anchor);
            });
        });

        api.addEventListener('Hover', function (result) {
            console.log(result);

            if (result.instanceID) {
                // hit
                console.log(result.material);
            }

            api.pickColor({ x: result.position2D[0], y: result.position2D[1] }, function (rgba) {
                console.log(arguments);
                console.log(
                    'rgba(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ', ' + rgba[3] + ')'
                );
            });
        });
    });
};

client.init(uid, {
    success: success,
    error: error,
});

//////////////////////////////////
// GUI Code
//////////////////////////////////
function initGui() {
    var controls = document.getElementById('controls');
    var buttonsText = '';
    buttonsText += '<button id="screenshot">📷 IMAGEN DE ERMUA</button>';
    controls.innerHTML = buttonsText;
}
initGui();

//////////////////////////////////
// GUI Code end
//////////////////////////////////