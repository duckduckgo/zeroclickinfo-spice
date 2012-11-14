root = this
root.detect_lang.debug = true

describe "Detect Language:", ->
    it "correctly detects a known query", ->
        json = 
            data: 
                detections: [ {
                        language: 'es',
                        isReliable: false,
                        confidence: 0.4517133956386293
                    }, {
                        language: 'pt',
                        isReliable: false,
                        confidence: 0.08356545961002786
                    }
                ]
        result = detections: [{language: 'Spanish', confidence: '(45% sure)'}, {language: 'Portuguese', confidence: '(8% sure)'}]
        expect(ddg_spice_detect_lang json).toEqual(result)

    it "returns an undefined when 'detections' is empty", ->
        json = 
            data: 
                detections: []
        expect(ddg_spice_detect_lang json).toBe(undefined)
    it "returns an undefined when 'detections' does not exist", ->
        json = 
            data: {}
        expect(ddg_spice_detect_lang json).toBe(undefined)

    it "returns an undefined when 'data' does not exist", ->
        json = {}
        expect(ddg_spice_detect_lang json).toBe(undefined)
    
    it "shows a single language when a single language is found", ->
        json = 
            data: 
                detections: [ {
                        language: 'es',
                        isReliable: false,
                        confidence: 0.4517133956386293
                    }
                ]
        result = detections: [{language: 'Spanish', confidence: '(45% sure)'}]
        expect(ddg_spice_detect_lang json).toEqual(result)

    it "returns an empty array when the language code does not exist in our dictionary", ->
        json = 
            data: 
                detections: [ {
                        language: 'lol',
                        isReliable: false,
                        confidence: 0.4517133956386293
                    }, {
                        language: 'lmfao',
                        isReliable: false,
                        confidence: 0.08356545961002786
                    }
                ]

        expect(ddg_spice_detect_lang json).toEqual(detections: [])