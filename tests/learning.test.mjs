import test from 'node:test';
import assert from 'node:assert/strict';
import {defaults,tasks,progressMinutes,normalize,nextReview} from '../lib/learning.mjs';
test('daily plan is 60 minutes and required defaults are preconfigured',()=>{assert.equal(tasks.reduce((s,t)=>s+t.minutes,0),60);assert.equal(defaults.speed,.75);assert.equal(defaults.accent,'en-US');assert.equal(defaults.level,'初中基础');});
test('progress isolates days and never counts duplicate completion twice',()=>{assert.equal(progressMinutes({'0-0':true,'0-1':true,'1-2':true},0),25);assert.equal(progressMinutes({'0-0':true,'0-1':false},0),10);});
test('dictation ignores punctuation and case but retains word differences',()=>{assert.equal(normalize('Please check the invoice!'),normalize('please check the invoice.'));assert.notEqual(normalize('Please check an invoice'),normalize('Please check the invoice'));});
test('review intervals grow with success and reset after mistakes',()=>{assert.equal(nextReview(false,6,0),86400000);assert.equal(nextReview(true,2,0),4*86400000);assert.equal(nextReview(true,9,0),14*86400000);});
