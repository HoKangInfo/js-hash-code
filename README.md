# js-hash-code
generate a javascript object hash code. 

### Install ###
```
> npm install js-hash-code
```

### How to use it ###
```
const hash = require('js-hash-code');

var obj = [1,2,3];
var hashcode = hash(obj);
// => '-5ba36363'
```

### API ###
Generate a javascript object hash code.  

JDK doc about hashCode,
>The general contract of hashCode is:
>
>- Whenever it is invoked on the same object more than once during an execution of a Java application, the hashCode method must consistently return the same integer, provided no information used in equals comparisons on the object is modified. This integer need not remain consistent from one execution of an application to another execution of the same application.
>
>- If two objects are equal according to the equals(Object) method, then calling the hashCode method on each of the two objects must produce the same integer result.
>
>- It is not required that if two objects are unequal according to the equals(java.lang.Object) method, then calling the hashCode method on each of the two objects must produce distinct integer results. However, the programmer should be aware that producing distinct integer results for unequal objects may improve the performance of hash tables.

JAVA return integer, but `js-hash-code` return hex string.

```
Arguments

obj (*): a javascript object. 

algo (String|Function): The hash algorithms. default like JAVA hashCode.

set (Boolean): ignore collection is object or array, has same elements, hash code is same, if true. 

Returns

(string): Returns the javascript object hash code.
```

Irrelevant order, Example
```
// object content with different order, but same value.
var obj1 = {'a':1, 'b':2};
var obj2 = {'b':2, 'a':1};

hash(obj1)==hash(obj2);
// => true
```

Relevant order, Example
```
// array content with different order, but same value.
var obj1 = [1, 2];
var obj2 = [2, 1];

hash(obj1)==hash(obj2);
// => false
```

because, array [1, 2] is like object {'0':1, '1':2}, and array [2, 1] is like object {'0':2, '1':1}
```
var obj1 = {'0':1, '1':2};
var obj2 = {'0':2, '1':1};

hash(obj1)==hash(obj2);
// => false
```

Irrelevant collection type, like set, Example
```
var obj1 = [1, 2];
var obj2 = {'0':1, '1':2};

hash(obj1)==hash(obj2);
// => false

hash(obj1, true)==hash(obj2, true);
// => true

hash([])==hash({});
// => false

hash([], true)==hash({}, true);
// => true

var obj1 = [1, [2, 3]];
var obj2 = [[3, 2], 1];

hash(obj1, true)==hash(obj2, true);
// => true

var obj2 = [{'0':3, '1':2}, 1];
hash(obj1, true)==hash(obj2, true);
// => true
```

custom algorithms, Example
```
var obj = [1, 2];
var algo = function(str){
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash += (str.charCodeAt(i) % 8);
    }
    return hash.toString(16);
}

hash(obj)
// => '748c0cf2'

hash(obj, algo)
// => '199'
```

supported mixed array
```
var obj1 = [1, 2];
    obj1['a'] = 3;
// => [ 1, 2, a: 3 ]
    
var obj2 = [2];
    obj2['a'] = 3;
    obj2[1] = 1;
// => [ 2, 1, a: 3 ]

hash(obj1)==hash(obj2);
// => false

hash(obj1, true)==hash(obj2, true);
// => true
```

### Supported algorithms ###
md1, md5 mdc2, rmd160, sha, sha1, sha224, sha256, sha384, sha512, crc1, crc8, crc16, crc24, crc32, djb2, sdbm, lose, and default like Java Object hashCode function.

`js-hash-code` return value maybe not equal crypto.
```
var str='';
crypto.createHash('md5').update(str).digest("hex") == hash(str,'md5')
// => false
```
