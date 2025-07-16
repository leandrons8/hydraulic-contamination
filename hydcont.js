const sizes = [1, 5, 15, 25, 50, 100]
const sizesC = [4, 6, 14, 21, 38, 70]

const iso = [
    [     "0",      1e0],
    [     "1",      2e0],
    [     "2",      4e0],
    [     "3",      8e0],
    [     "4",     16e0],
    [     "5",     32e0],
    [     "6",     64e0],
    [     "7",     13e1],
    [     "8",     25e1],
    [     "9",      5e2],
    [    "10",      1e3],
    [    "11",      2e3],
    [    "12",      4e3],
    [    "13",      8e3],
    [    "14",     16e3],
    [    "15",     32e3],
    [    "16",     64e3],
    [    "17",     13e4],
    [    "18",     25e4],
    [    "19",      5e5],
    [    "20",      1e6],
    [    "21",      2e6],
    [    "22",      4e6],
    [    "23",      8e6],
    [    "24",     16e6],
    [    "25",     32e6],
    [    "26",     64e6],
    [    "27",     13e7],
    [    "28",     25e7],
    ["&gt;29", Infinity]
]

const saec = [
    [   "000",      195,       76,       14,        3,        1,        0],
    [    "00",      390,      152,       27,        5,        1,        0],
    [     "0",      780,      304,       54,       10,        2,        0],
    [     "1",     1560,      609,      109,       20,        4,        1],
    [     "2",     3120,     1217,      217,       39,        7,        1],
    [     "3",     6250,     2432,      432,       76,       13,        2],
    [     "4",    12500,     4864,      864,      152,       26,        4],
    [     "5",    25000,     9731,     1731,      306,       53,        8],
    [     "6",    50000,    19462,     3462,      612,      106,       16],
    [     "7",   100000,    38924,     6924,     1224,      212,       32],
    [     "8",   200000,    77849,    13849,     2449,      424,       64],
    [     "9",   400000,   155698,    27698,     4898,      848,      128],
    [    "10",   800000,   311396,    55396,     9796,     1696,      256],
    [    "11",  1600000,   622792,   110792,    19592,     3392,      512],
    [    "12",  3200000,  1245584,   221584,    39184,     6784,     1024],
    ["&gt;12", Infinity, Infinity, Infinity, Infinity, Infinity, Infinity]
]

const saed = [
    [    "00",      125,       22,        4,        1,        0],
    [     "0",      250,       44,        8,        2,        0],
    [     "1",      500,       89,       16,        3,        1],
    [     "2",     1000,      178,       32,        6,        1],
    [     "3",     2000,      356,       63,       11,        2],
    [     "4",     4000,      712,      126,       22,        4],
    [     "5",     8000,     1425,      253,       45,        8],
    [     "6",    16000,     2850,      506,       90,       16],
    [     "7",    32000,     5700,     1012,      180,       32],
    [     "8",    64000,    11400,     2025,      360,       64],
    [     "9",   128000,    22800,     4050,      720,      128],
    [    "10",   256000,    45600,     8100,     1440,      256],
    [    "11",   512000,    91200,    16200,     2880,      512],
    [    "12",  1024000,   182400,    32400,     5760,     1024],
    ["&gt;12", Infinity, Infinity, Infinity, Infinity, Infinity]
]

function renderTISO(arr, elementId){
    const tbody = document.getElementById(elementId)
    for (let i = arr.length - 1; i >= 0; i--) {
        const r = document.createElement("tr")
        const c1 = document.createElement("td")
        const c2 = document.createElement("td")
        const c3 = document.createElement("td")
        tbody.append(r)
        r.append(c1, c2, c3) 
        if (i==0){
            c1.innerHTML = 0
            c2.innerHTML = arr[i][1].toLocaleString()
            c3.innerHTML = arr[i][0]
        } else {
            c1.innerHTML = arr[i-1][1].toLocaleString()
            c2.innerHTML = arr[i][1].toLocaleString()
            c3.innerHTML = arr[i][0]
        }
    }
}

function renderTSAE(arr, elementId){
    const tbody = document.getElementById(elementId)
    for (const row of arr){
        const r = document.createElement("tr")
        tbody.append(r)
        for (const col of row){
            const c = document.createElement("td")
            r.append(c)
            c.innerHTML = col.toLocaleString()
        }
    }
}

function fieldNC(size){
    const field = document.createElement("input")
    field.className = "form-control"
    field.dataset.size = size
    field.type = "number"
    field.min = 0
    field.onchange = function (){
        const s1 = Number(this.dataset.size)
        let v1 = Number(this.value)
        if (v1 < 0){
            v1 = 0
            this.value = v1
        }
        const row = this.parentNode.parentNode
        for (let i = 1; i < row.childElementCount; i++){
            const s2 = Number(row.children[i].children[0].dataset.size)
            const v2 = Number(row.children[i].children[0].value)
            if (((s1 > s2) && (v1 > v2)) || ((s1 < s2) && (v1 < v2))){
                row.children[i].children[0].value = v1
            }
        }
        updateCont(false)
    }
    return field
}

function fieldND(size){
    const field = document.createElement("input")
    field.className = "form-control"
    field.dataset.size = size
    field.type = "number"
    field.min = 0
    field.onchange = function (){
        const value = Number(this.value)
        if (value < 0){
            this.value = 0
        }
        updateCont(true)
    }
    return field
}

function fieldISO(size){
    const field = document.createElement("select")
    field.className = "form-select"
    field.dataset.size = size
    for (const row of iso){
        const opt = document.createElement("option")
        field.append(opt)
        opt.value = row[1]
        opt.innerHTML = row[0]
    }
    field.onchange = function (){
        const s1 = Number(this.dataset.size)
        const v1 = Number(this.value)

        const row = this.parentNode.parentNode
        for (let i = 1; i < row.childElementCount; i++){
            const s2 = Number(row.children[i].children[0].dataset.size)
            const v2 = Number(row.children[i].children[0].value)
            if (((s1 > s2) && (v1 > v2)) || ((s1 < s2) && (v1 < v2))){
                row.children[i].children[0].value = v1
            }
        }
        updateCont(false)
    }
    return field
}

function fieldSAEC(size){
    const field = document.createElement("select")
    field.className = "form-select"
    field.dataset.size = size
    const colSize = sizesC.indexOf(size) + 1
    for (const row of saec){
        const opt = document.createElement("option")
        field.append(opt)
        opt.value = row[colSize]
        opt.innerHTML = row[0]
    }
    field.onchange = function (){
        const row = this.parentNode.parentNode
        const idx = this.parentNode.cellIndex
        for (let i = idx + 1; i < row.childElementCount; i++){
            const v1 = Number(row.children[i-1].children[0].value)
            const v2 = Number(row.children[i].children[0].value)
            if (v1 < v2){
                for (let j = saec.length - 1; j >= 0; j--){
                    if (saec[j][i] <= v1){
                        row.children[i].children[0].value = saec[j][i]
                        break
                    }
                }
            }
        }
        for (let i = idx - 1; i > 0; i--){
            const v1 = Number(row.children[i].children[0].value)
            const v2 = Number(row.children[i+1].children[0].value)
            if (v1 < v2){
                for (let j = 0; j < saec.length; j++){
                    if (saec[j][i] >= v2){
                        row.children[i].children[0].value = saec[j][i]
                        break
                    }
                }
            }
        }
        updateCont(false)
    }
    return field
}

function fieldSAED(size){
    const field = document.createElement("select")
    field.className = "form-select"
    field.dataset.size = size
    const colSize = sizesC.indexOf(size)
    for (const row of saed){
        const opt = document.createElement("option")
        field.append(opt)
        opt.value = row[colSize]
        opt.innerHTML = row[0]
    }
    field.onchange = function (){
        updateCont(true)
    }
    return field
}

function updateCont(isDifferential){
    const row = document.getElementById("inputs")
    const cumulative = [0, 0, 0, 0, 0, 0]
    const differential = [0, 0, 0, 0, 0, 0]
    
    const imax = row.childElementCount - 1
    
    const value = Number(row.children[imax].children[0].value)
    const size = Number(row.children[imax].children[0].dataset.size)
    const idx = sizesC.indexOf(size)
    cumulative[idx] = value
    differential[idx] = value

    for (let i = imax - 1; i > 0; i--){
        const value = Number(row.children[i].children[0].value)
        const size = Number(row.children[i].children[0].dataset.size)
        const idx = sizesC.indexOf(size)
        if (isDifferential){
            cumulative[idx] = value + cumulative[idx+1]
            differential[idx] = value
        } else {
            cumulative[idx] = value
            differential[idx] = value - cumulative[idx+1]
        }
    }

    for (let i = 4; i >= 0; i--){
        if (cumulative[i] < cumulative[i+1]){
            cumulative[i] = cumulative[i+1]
        }
    }

    resNC(cumulative)
    resND(differential)
    resISO4(cumulative)
    resISO1(cumulative)
    resSAEC(cumulative)
    resSAED(differential)
}

function resNC(arr){
    row = document.getElementById("resnc")
    for (const [i, n] of arr.entries()){
        row.children[i+1].innerHTML = n.toLocaleString()
    }
}

function resND(arr){
    row = document.getElementById("resnd")
    for (const [i, n] of arr.entries()){
        row.children[i+1].innerHTML = n.toLocaleString()
    }
}

function resISO4(arr){
    row = document.getElementById("resiso4")
    for (const [i, n] of arr.slice(0, 3).entries()){
        for (const cls of iso){
            if (n <= cls[1]){
                row.children[i+1].innerHTML = cls[0]
                break
            }
        }
    }
}

function resISO1(arr){
    row = document.getElementById("resiso1")
    for (const [i, n] of arr.slice(1, 3).entries()){
        for (const cls of iso){
            if (n <= cls[1]){
                row.children[i+2].innerHTML = cls[0]
                break
            }
        }
    }
}

function resSAEC(arr){
    row = document.getElementById("ressaec")
    for (const [i, n] of arr.entries()){
        for (const cls of saec){
            if (n <= cls[i+1]){
                row.children[i+1].innerHTML = cls[0]
                break
            }
        }
    }
}

function resSAED(arr){
    row = document.getElementById("ressaed")
    for (const [i, n] of arr.slice(1, 6).entries()){
        for (const cls of saed){
            if (n <= cls[i+1]){
                row.children[i+2].innerHTML = cls[0]
                break
            }
        }
    }
}

function standard(element){
    const params = {
        "nc": {
            "size1": [1, 5, 15, 25, 50, 100],
            "size2": [4, 6, 14, 21, 38, 70],
            "differential": false,
            "field": fieldNC
        },
        "nd": {
            "size1": [1, 5, 15, 25, 50, 100],
            "size2": [4, 6, 14, 21, 38, 70],
            "differential": true,
            "field": fieldND
        },
        "iso4": {
            "size1": [1, 5, 15],
            "size2": [4, 6, 14],
            "differential": false,
            "field": fieldISO
        },
        "iso1": {
            "size1": [5, 15],
            "size2": [6, 14],
            "differential": false,
            "field": fieldISO
        },
        "saec": {
            "size1": [1, 5, 15, 25, 50, 100],
            "size2": [4, 6, 14, 21, 38, 70],
            "differential": false,
            "field": fieldSAEC
        },
        "saed": {
            "size1": [5, 15, 25, 50, 100],
            "size2": [6, 14, 21, 38, 70],
            "differential": true,
            "field": fieldSAED
        }
    }[element.value]

    const trh1 = document.getElementById("trh1")
    const trh2 = document.getElementById("trh2")
    const inputs = document.getElementById("inputs")
    const size1 = params["size1"]
    const size2 = params["size2"]
    const differential = params["differential"]
    const fieldFunction = params["field"]

    while (trh1.childElementCount > 1){
        trh1.removeChild(trh1.lastChild)
    }
 
    while (trh2.childElementCount > 0){
        trh2.removeChild(trh2.lastChild)
    }

    while (inputs.childElementCount > 1){
        inputs.removeChild(inputs.lastChild)
    }

    for (let i = 0; i < size1.length; i++){
        const th1 = document.createElement("th")
        const th2 = document.createElement("th")
        const td = document.createElement("td")
        const field = fieldFunction(size2[i])

        trh1.append(th1)
        trh2.append(th2)
        inputs.append(td)
        td.append(field)
        th1.scope = "col"
        th1.innerHTML = `&gt;${size1[i]}&micro;m`
        th2.scope = "col"
        th2.innerHTML = `&gt;${size2[i]}&micro;m(c)`
        if (differential){
            th1.innerHTML += size1[i+1] ? `<br>&le;${size1[i+1]}&micro;m` : ``
            th2.innerHTML += size2[i+1] ? `<br>&le;${size2[i+1]}&micro;m` : ``
        }
    }
    updateCont(differential)
}

function launchPage(){
    const std = document.getElementById("std")
    standard(std)
    renderTISO(iso, "tiso")
    renderTSAE(saec, "tsaec")
    renderTSAE(saed, "tsaed")
}

launchPage()
