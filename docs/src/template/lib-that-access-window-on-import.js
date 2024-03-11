// todo 速改驼峰、大小写转换等
const btnEl = document.getElementById('computed-btn')
const inputEl = document.getElementById('computed-textarea')
const resultEl = document.getElementById('computed-result')
if (btnEl) {
    btnEl.addEventListener('click', () => {
        // computed-result
        resultEl.innerHTML  = inputEl.value.toUpperCase()
    })
}

const btnEl2 = document.getElementById('computed-btn2')
if (btnEl2) {
    btnEl2.addEventListener('click', () => {
        console.log('驼峰-短横线互转', kebabToCamelOrReversal(inputEl.value))
    })
    
}
// 驼峰-短横线互转
function kebabToCamelOrReversal(str) {
    console.log('====-----str-----====', str)
	if (!str) return
	if (str.indexOf('-') != -1) {
		return str.replace(/-(\w)/g, (match, group1) => group1.toUpperCase());
	} else {
		return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}
}