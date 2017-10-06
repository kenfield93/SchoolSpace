/**
 * Created by kyle on 10/5/17.
 */

export default function debounce(fn, timer, callee){
    let timeoutId;
    return function() {
        // since 'fn' will be called from setTimout we want to put our own 'this'. either what user passed or else the this of debounce
        callee = (typeof callee === 'undefined') ? this : callee;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(()=> {
            fn.apply(callee, args);
        }, timer);
    };
}

