"use strict";

const spb_list = {}

function expandLog(segment, id, segmentId) {
    const segmentHeight = spb_list[id][segmentId].segmentHeight
    const descriptionDiv = segment.find('.description')
    
    if(!spb_list[id][segmentId].expanded){

        segment.find('.log').css("height", `100px`)
        const dHeight = descriptionDiv.css("height")
        console.log(dHeight)
        segment.css("height", `150px`)
        spb_list[id][segmentId].expanded = true
    }
    else {
        segment.find('.log').css("height", `0px`)
        spb_list[id][segmentId].expanded = false
        segment.css("height", `${segmentHeight}px`)
    }
}

function updateLog(segment, id, segmentId){
    const log = spb_list[id][segmentId].log
    const logDiv = segment.find('.log')
    logDiv.append(`<p>${log[log.length - 1]}</p>`)
}

function spb(selector, length = 500) {
    const _self = {}
    _self.div = $(selector)
    _self.id = selector.slice(1)
    
    if(!spb_list[_self.id]) {
        spb_list[_self.id] = {}
        spb_list[_self.id].length = length
        spb_list[_self.id].segmentNumber = 0
        _self.div.append(`<div class='segments'><div>`)
        _self.div.append(`<div class='totalStatus'>0%<div>`)
    }

    _self.addSegment = function(description, percentage) {
        const segmentId = `segment_${spb_list[_self.id].segmentNumber}`
        
        spb_list[_self.id][segmentId] = {}
        spb_list[_self.id][segmentId].description = description
        spb_list[_self.id][segmentId].percentage = percentage
        spb_list[_self.id][segmentId].status = 0
        spb_list[_self.id][segmentId].log = []
        spb_list[_self.id][segmentId].expanded = false
        spb_list[_self.id][segmentId].id = spb_list[_self.id].segmentNumber
        
        spb_list[_self.id].segmentNumber = spb_list[_self.id].segmentNumber + 1

        _self.div.find('.segments').append(`<div id='${segmentId}' class='segment'><div>`)

        const segment = _self.div.find(`#${segmentId}`)

        segment.append(`<div class="segment_bar"><div class="status"></div></div>`)
        segment.append(`<div class="description"><p class='title'><span></span>${description}</p></div>`)

        const log = spb_list[_self.id][segmentId].log
        const descriptionDiv = segment.find('.description')
        console.log(descriptionDiv)
        descriptionDiv.prepend('<div class="log"></div>')
        const logDiv = segment.find('.log')
        log.forEach(element => {
            logDiv.append(`<p>${element}</p>`)
        });
        segment.find('.log').css("height", `0px`)
        segment.click(() => {expandLog(segment, _self.id, segmentId)})

        const segmentHeight = parseInt(length * (percentage / 100.0))
        spb_list[_self.id][segmentId].segmentHeight = segmentHeight
        segment.css("height", `${segmentHeight}px`)

        segment.find('.status').css('height', `${spb_list[_self.id][segmentId].status}%`)
    }

    _self.updateStatus = function(id, status) {
        const segmentId = `segment_${id}`
        const segment = _self.div.find(`#${segmentId}`)
        spb_list[_self.id][segmentId].status = status
        segment.find('.description').find('.title').find('span').text(`${status}%, `)
        segment.find('.status').css('height', `${status}%`)

        let totalStatus = 0
        for(let i=0; i< spb_list[_self.id].segmentNumber; i++){
            const segmentid = `segment_${i}`
            const percentage = spb_list[_self.id][segmentid].percentage
            const partialStatus = (percentage / 100.0) * spb_list[_self.id][segmentid].status
            totalStatus = totalStatus + partialStatus
        }

        _self.div.find('.totalStatus').text(`${parseInt(totalStatus)}%`)
    }

    _self.updateDescription = function(id, description) {
        const segmentId = `segment_${id}`
        const segment = _self.div.find(`#${segmentId}`)
        spb_list[_self.id][segmentId].description = description
        segment.find('.description').find('.title').text(description)
    }

    _self.log = function(id, log) {
        const segmentId = `segment_${id}`
        const segment = _self.div.find(`#${segmentId}`)
        spb_list[_self.id][segmentId].log.push(log)
        updateLog(segment, _self.id, segmentId)
    }

    return _self
}