$(function () {
    $('#example').click(e => {
        e.preventDefault();
        $('.example').slideToggle();
    });

    $('#copy').click(e => {
        e.preventDefault();
        let text = $('#output').val();
        navigator.clipboard.writeText(text).then(() => {
            $('#copy').text('Copied!');
            setTimeout(() => {
                $('#copy').text('Copy to Clipboard');
            }, 1500);
        }
        );
    });

    $('#input').on('input', recomputeInterpolation);
});

function recomputeInterpolation(e) {
    var input = $('#input').val();

    try {
        input = JSON.parse(input);
    } catch (e) {
        setOutput('Invalid JSON: ' + e.message);
        return false;
    }

    if (!validateInput(input)) return;

    input = interpolate(input);

    setOutput(input);
}

function interpolate(input) {
    if (Object.keys(input)[0] !== '0') {
        input['0'] = input[Object.keys(input)[0]];
    }

    for (var i = 0; i < Object.keys(input).length - 1; i++) {
        var key1 = Object.keys(input)[i];
        var key2 = Object.keys(input)[i + 1];

        if (key2 - key1 > 1) {
            var value1 = input[key1];
            var value2 = input[key2];

            for (var j = 1; j < key2 - key1; j++) {
                if (value1.trim() == value2.trim()) {
                    input[(Number(key1) + j).toString()] = value1;
                }
                else {
                    var distToKey1 = j;
                    var distToKey2 = key2 - key1 - j;
                    var totalDist = distToKey1 + distToKey2;
                    var percent1 = distToKey1 / totalDist;
                    var percent2 = distToKey2 / totalDist;

                    var value = `(${value1}:${flf(percent1)}) AND (${value2}:${flf(percent2)})`

                    input[(Number(key1) + j).toString()] = value;
                }
            }
        }
    }

    return input;
}

function flf(num) {
    return parseFloat(num.toFixed(5));
}

function validateInput(input) {
    if (typeof input !== 'object' || input === null || Array.isArray(input)) {
        setOutput('Input must be a JSON object.');
        return false;
    }

    if (Object.keys(input).length === 0) {
        setOutput('Error: Input must have at least one keyframe.');
        return false;
    }

    for (var key in input) {
        if (input.hasOwnProperty(key) && !Number.isInteger(Number(key))) {
            setOutput('Error: Found a keyframe that was non-numeric.');
            return false;
        }
    }

    return true;
}

function setOutput(output) {
    if (typeof output !== 'string') {
        output = JSON.stringify(output, null, 4);
    }
    $('#output').val(output);
}
