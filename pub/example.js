"use strict";

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const spb_config = {
    length: 500,
    horizontal: true,
    //backgroundColor: '#8784f0',
    //segmentBackgroundColor: '#8784f9',
    segmentHoverColor: '#d6e4ff',

}

const spb1 = spb('#example_spb', spb_config);
spb1.addSegment('Uploading the setup files are to the server', 12);
spb1.addSegment('Extracting files', 15);
spb1.addSegment('Installing Dependencies', 18);
spb1.addSegment('Install the Ipsum software', 30);
spb1.addSegment('Delete setup files', 15);
spb1.addSegment('Run the server', 10);

const spb_config_2 = {
    length: 500,
    horizontal: false,
    backgroundColor: '#9ebbf0',
    logBackgroundColor: '#ebf1fc',
    segmentBackgroundColor: '#ebf1fc',
    statusColor: '#8784f0',
    totalStatusColor: 'white',
}

const spb2 = spb('#example_spb_2', spb_config_2);
spb2.addSegment('Uploading the setup files are to the server', 12);
spb2.addSegment('Extracting files', 15);
spb2.addSegment('Installing Dependencies', 18);
spb2.addSegment('Install the Ipsum software', 30);
spb2.addSegment('Delete setup files', 15);
spb2.addSegment('Run the server', 10);

async function test(spb_inctance){
    for(let i=0; i<=10; i++){
        spb_inctance.updateStatus(0, 10*i);
        await sleep(240)
    }
    spb_inctance.updateDescription(0, 'Setup files are uploaded to the server')

    for(let i=0; i<=10; i++){
        spb_inctance.updateStatus(1, 10*i);
        await sleep(300)
    }
    spb_inctance.updateDescription(1, 'Files Extracted')

    for(let i=0; i<=10; i++){
        spb_inctance.updateStatus(2, 10*i);
        await sleep(360)
    }
    spb_inctance.updateDescription(2, 'Installed Dependencies')

    for(let i=0; i<=10; i++){
        spb_inctance.updateStatus(3, 10*i);
        await sleep(600)
    }
    spb_inctance.updateDescription(3, 'Installed the Ipsum software')

    for(let i=0; i<=10; i++){
        spb_inctance.updateStatus(4, 10*i);
        await sleep(300)
    }
    spb_inctance.updateDescription(4, 'Deleted the setup files')

    for(let i=0; i<=10; i++){
        spb_inctance.updateStatus(5, 10*i);
        await sleep(200)
    }
    spb_inctance.updateDescription(5, 'Server is running')
}

async function test2(spb_inctance){
    for(let i=0; i<=10; i++){
        spb_inctance.log(0, `A long log expression 100${i}`);
        await sleep(240)
    }

    for(let i=0; i<=10; i++){
        spb_inctance.log(1, `A long log expression 200${i}`);
        await sleep(300)
    }

    for(let i=0; i<=10; i++){
        spb_inctance.log(2, `A long log expression 300${i}`);
        await sleep(360)
    }

    for(let i=0; i<=10; i++){
        spb_inctance.log(3, `A long log expression 400${i}`);
        await sleep(600)
    }

    for(let i=0; i<=10; i++){
        spb_inctance.log(4, `A long log expression 500${i}`);
        await sleep(300)
    }

    for(let i=0; i<=10; i++){
        spb_inctance.log(5, `A long log expression 600${i}`);
        await sleep(200)
    }
}


test(spb1)
test2(spb1)

test(spb2)
test2(spb2)