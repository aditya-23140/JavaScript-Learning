function checkPalindrome(){
    let str = document.getElementById('text-input').value;
    // Remove all non-alphanumeric characters and convert to lowercase
    let value = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    let reversedValue = value.split('').reverse().join('');
    let len = value.length;

    if (len == 0) {
        alert("Please input a value");
        return;
    }

    if (value === reversedValue) {
        document.getElementById('result').innerHTML = `<strong>${str}</strong> is a palindrome`;
    } else {
        document.getElementById('result').innerHTML = `<strong>${str}</strong> is not a palindrome`;
    }
}