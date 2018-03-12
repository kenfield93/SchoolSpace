/**
 * Created by kyle on 10/12/17.
 */
import React from 'react';
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import MainDisplay from './MainDisplay';

const posts = [{id: 3, responsetopostid: null}, {id: 4, responsetopostid: null}, {id: 5,
    responsetopostid: 3}, {id: 6, responsetopostid: 5}, {id: 75, responsetopostid: 4}];

describe('MainDisplay tests via Enzyme', () => {

    it('Maps Comments to those comments that replied to it', () => {
        const map = MainDisplay.mapOfPostsToDirectResponders(posts);
        expect(map.get(5)[0].id).toBe(6);
        expect(map.get(3)[0].id).toBe(5);
        expect(map.get(null)[0].id).toBe(3);
        expect(map.get(6)).toNotExist();
      //  expect(map.get(null)).toBe(expect.arrayContaining(array))
    });

    it('Prints order of posts with their nesting level', () => {
        const map = MainDisplay.mapOfPostsToDirectResponders(posts);
        const order = MainDisplay.getPrintPostInfo(map);

        expect(order.length).toBe(posts.length);
        let orderObj = Object.values(order[0]);


    });

});
