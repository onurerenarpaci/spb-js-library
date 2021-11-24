"use strict";

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const spb1 = spb('#example_spb');
spb1.addSegment('Uploading the setup files are to the server', 12);
spb1.addSegment('Extracting files', 15);
spb1.addSegment('Installing Dependencies', 18);
spb1.addSegment('Install the Ipsum software', 30);
spb1.addSegment('Delete setup files', 15);
spb1.addSegment('Run the server', 10);

async function test(){
    for(let i=0; i<=10; i++){
        spb1.updateStatus(0, 10*i);
        await sleep(240)
    }
    spb1.updateDescription(0, 'Setup files are uploaded to the server')

    for(let i=0; i<=10; i++){
        spb1.updateStatus(1, 10*i);
        await sleep(300)
    }
    spb1.updateDescription(1, 'Files Extracted')

    for(let i=0; i<=10; i++){
        spb1.updateStatus(2, 10*i);
        await sleep(360)
    }
    spb1.updateDescription(2, 'Installed Dependencies')

    for(let i=0; i<=10; i++){
        spb1.updateStatus(3, 10*i);
        await sleep(600)
    }
    spb1.updateDescription(3, 'Installed the Ipsum software')

    for(let i=0; i<=10; i++){
        spb1.updateStatus(4, 10*i);
        await sleep(300)
    }
    spb1.updateDescription(4, 'Deleted the setup files')

    for(let i=0; i<=10; i++){
        spb1.updateStatus(5, 10*i);
        await sleep(200)
    }
    spb1.updateDescription(5, 'Server is running')
}

async function test2(){
    for(let i=0; i<=10; i++){
        spb1.log(0, `A long log expression 200${i}`);
        await sleep(240)
    }

    for(let i=0; i<=10; i++){
        spb1.log(1, `A long log expression 200${i}`);
        await sleep(300)
    }

    for(let i=0; i<=10; i++){
        spb1.log(2, `A long log expression 200${i}`);
        await sleep(360)
    }

    for(let i=0; i<=10; i++){
        spb1.log(3, `A long log expression 200${i}`);
        await sleep(600)
    }

    for(let i=0; i<=10; i++){
        spb1.log(4, `A long log expression 200${i}`);
        await sleep(300)
    }

    for(let i=0; i<=10; i++){
        spb1.log(5, `A long log expression 200${i}`);
        await sleep(200)
    }
}


test()
test2()