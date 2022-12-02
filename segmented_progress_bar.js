"use strict";

(function(global, document, $) { 

    const spb_list = {}

    function expandLog(segment, id, segmentNumber, config) {
        const segmentId = `segment_${segmentNumber}`
        const currentSegment = spb_list[id].currentSegment
        if (config.horizontal){
            if(currentSegment != segmentNumber) {
                const status = spb_list[id][segmentId].status
                spb_list[id].div.find('.description').find('.title').html(`<span></span>${spb_list[id][segmentId].description}`)
                if (status) spb_list[id].div.find('.description').find('.title').find('span').text(`${status}%, `)
                spb_list[id].currentSegment = segmentNumber
                const log = spb_list[id][segmentId].log.map(log1 => `<p>${log1}</p>`)
                const logDiv = spb_list[id].div.find('.description').find('.log')
                logDiv.html('')
                logDiv.append(log)
            }
        }
        else{
            const segmentHeight = spb_list[id][segmentId].segmentHeight
            const descriptionDiv = segment.find('.description')
            
            if(!spb_list[id][segmentId].expanded){
                segment.find('.log-wrapper').css("height", '100px')
                segment.find('.log').css("min-height", `100px`)
                const dHeight = descriptionDiv.css("height")
                console.log(dHeight)
                segment.css("height", `150px`)
                spb_list[id][segmentId].expanded = true
            }
            else {
                segment.find('.log-wrapper').css("height", '0px')
                segment.find('.log').css("min-height", `0px`)
                spb_list[id][segmentId].expanded = false
                segment.css("height", `${segmentHeight}px`)
            }
        }
    }

    function updateLog(segment, id, segmentNumber, currentSegment, config){
        const segmentId = `segment_${segmentNumber}`
        if (config.horizontal){
            if(currentSegment == segmentNumber) {
                const log = spb_list[id][segmentId].log
                const logDiv = spb_list[id].div.find('.description').find('.log')
                const logWrapper = spb_list[id].div.find('.description').find('.log-wrapper')
                logDiv.append(`<p>${log[log.length - 1]}</p>`)
                logWrapper.scrollTop(logDiv.height())
            }
        }
        else{
            const log = spb_list[id][segmentId].log
            const logDiv = segment.find('.log')
            const logWrapper = segment.find('.log-wrapper')
            logDiv.append(`<p>${log[log.length - 1]}</p>`)
            logWrapper.scrollTop(logDiv.height())
        }
    }

    const config_default = {
        width: "600px",
        length: 500,
        horizontal: false,
        backgroundColor: '#F5FFFD',
        logBackgroundColor: '#EAEDE8',
        segmentBackgroundColor: '#C0C0C0',
        statusColor: '#9DEC96',
        segmentHoverColor: '#7EAE79',
        totalStatusColor: '#7EAE79',
    }

    function spb(selector, config = config_default) {
        config = {...config_default, ...config}
        const _self = {}
        _self.div = $(selector)
        _self.id = selector.slice(1)
        _self.div.css('background-color', config.backgroundColor)
        _self.div.css('width', config.width)
        
        if(!spb_list[_self.id]) {
            spb_list[_self.id] = {}
            spb_list[_self.id].length = config.length
            spb_list[_self.id].segmentNumber = 0
            if (config.horizontal){
                _self.div.append(`<div class='description'><div>`)
            }
            _self.div.append(`<div class='segments'><div>`)
            _self.div.append(`<div class='totalStatus'>0%<div>`)
            _self.div.find('.totalStatus').css('color', config.totalStatusColor)
        }

        _self.addSegment = function(description, percentage) {
            const segmentId = `segment_${spb_list[_self.id].segmentNumber}`
            const theSegmentNumber = spb_list[_self.id].segmentNumber
            
            spb_list[_self.id][segmentId] = {}
            spb_list[_self.id][segmentId].description = description
            spb_list[_self.id][segmentId].percentage = percentage
            spb_list[_self.id][segmentId].status = 0
            spb_list[_self.id][segmentId].log = []
            spb_list[_self.id][segmentId].expanded = false
            spb_list[_self.id][segmentId].id = spb_list[_self.id].segmentNumber        
            spb_list[_self.id].segmentNumber = spb_list[_self.id].segmentNumber + 1
            spb_list[_self.id].currentSegment = 0
            spb_list[_self.id].div = _self.div

            if (config.horizontal){
                _self.div.find('.segments').append(`<div id='${segmentId}' class='segment_h'><div>`)
                const segment = _self.div.find(`#${segmentId}`)
                segment.append(`<div class="segment_bar_h"><div class="status_h"></div></div>`)

                const segmentWidth = parseInt(config.length * (percentage / 100.0))
                spb_list[_self.id][segmentId].segmentWidth = segmentWidth
                segment.css("width", `${segmentWidth}px`)
                segment.find('.status_h').css('width', `${spb_list[_self.id][segmentId].status}%`)
                if(spb_list[_self.id].segmentNumber == 1){
                    const descriptionDiv = _self.div.find('.description')
                    descriptionDiv.append(`<p class='title'><span></span>${description}</p>`)
                    const log = spb_list[_self.id][segmentId].log
                    console.log(descriptionDiv)
                    descriptionDiv.prepend('<div class="log-wrapper"><div class="log"></div></div>')
                    const logDiv = segment.find('.log')
                    log.forEach(element => {
                        logDiv.append(`<p>${element}</p>`)
                    });
                    descriptionDiv.find('.log-wrapper').css("height", '100px')
                    descriptionDiv.find('.log').css("min-height", '100px')
                }
                segment.click(() => {expandLog(segment, _self.id, theSegmentNumber, config)})
            }
            else{
                _self.div.find('.segments').append(`<div id='${segmentId}' class='segment'><div>`)
                const segment = _self.div.find(`#${segmentId}`)
                segment.append(`<div class="segment_bar"><div class="status"></div></div>`)
                segment.append(`<div class="description"><p class='title'><span></span>${description}</p></div>`)
    
                const log = spb_list[_self.id][segmentId].log
                const descriptionDiv = segment.find('.description')
                descriptionDiv.prepend('<div class="log-wrapper"><div class="log"></div></div>')
                const logDiv = segment.find('.log')
                log.forEach(element => {
                    logDiv.append(`<p>${element}</p>`)
                });
                segment.find('.log-wrapper').css("height", '0px')
                segment.find('.log').css("min-height", `0px`)
                segment.click(() => {expandLog(segment, _self.id, theSegmentNumber, config)})
    
                const segmentHeight = parseInt(config.length * (percentage / 100.0))
                spb_list[_self.id][segmentId].segmentHeight = segmentHeight
                segment.css("height", `${segmentHeight}px`)
    
                segment.find('.status').css('height', `${spb_list[_self.id][segmentId].status}%`)
            }
            _self.div.find('.log').css('background-color', config.logBackgroundColor)
            _self.div.find('.segment_bar, .segment_bar_h').css('background-color', config.segmentBackgroundColor)
            _self.div.find('.status_h, .status').css('background-color', config.statusColor)
            _self.div.find('.segment_bar_h').hover(function() {$(this).css('border-color', config.segmentHoverColor)} )
        }

        _self.updateStatus = function(id, status) {
            const segmentId = `segment_${id}`
            const segment = _self.div.find(`#${segmentId}`)
            spb_list[_self.id][segmentId].status = status

            if (config.horizontal){                
                segment.find('.status_h').css('width', `${status}%`)
                if(spb_list[_self.id].currentSegment == id) {
                    _self.div.find('.description').find('.title').find('span').text(`${status}%, `)
                    if(status >= 100){
                        spb_list[_self.id].currentSegment = spb_list[_self.id].currentSegment + 1
                        const nextSegmentId = `segment_${id+1}`
                        if(spb_list[_self.id][nextSegmentId]){
                            _self.div.find('.description').find('.title').html(`<span></span>${spb_list[_self.id][nextSegmentId].description}`)
                        }
                    }
                }
            }
            else{
                segment.find('.description').find('.title').find('span').text(`${status}%, `)
                segment.find('.status').css('height', `${status}%`)
            }

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
            updateLog(segment, _self.id, id, spb_list[_self.id].currentSegment, config)
        }

        return _self
    }

    global.spb = global.spb || spb

})(window, window.document, $); 