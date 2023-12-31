var assert = require('assert');
var Scule = require('../lib/com.scule');

describe('BinaryTree', function() {
    describe('node', function() {
        it('should test the accessor functions', function() {
            var node = Scule.getBinarySearchTreeNode('foo', 'bar');
            assert.equal(node.getKey(), 'foo');
            assert.equal(node.getData(), 'bar');
            assert.equal(node.getLeft(), null);
            assert.equal(node.getRight(), null);
            node.setLeft(Scule.getBinarySearchTreeNode('foo1', 'bar1'));
            node.setRight(Scule.getBinarySearchTreeNode('foo2', 'bar2'));
            assert.equal(node.getLeft().getKey(), 'foo1');
            assert.equal(node.getLeft().getData(), 'bar1');
            assert.equal(node.getRight().getKey(), 'foo2');
            assert.equal(node.getRight().getData(), 'bar2');                
        });
    });
    it('should remove a node from the binary tree', function() {
        var node = Scule.getBinarySearchTreeNode('foo5', 'bar5');
        node.setLeft(Scule.getBinarySearchTreeNode('foo3', 'bar3'));
        node.getLeft().setLeft(Scule.getBinarySearchTreeNode('foo1', 'bar1'));
        node.getLeft().setRight(Scule.getBinarySearchTreeNode('foo4', 'bar4'));
        node.setRight(Scule.getBinarySearchTreeNode('foo8', 'bar8'));
        node.getRight().setLeft(Scule.getBinarySearchTreeNode('foo7', 'bar7'));
        node.getRight().setRight(Scule.getBinarySearchTreeNode('foo9', 'bar9'));
        node.remove(node.getLeft());
        assert.equal(node.getLeft().getKey(), 'foo4');
        assert.equal(node.getLeft().getData(), 'bar4');
        assert.equal(node.getLeft().getRight(), null);
        assert.equal(node.getLeft().getLeft().getKey(), 'foo1');
        node.remove(node.getRight());
        assert.equal(node.getRight().getKey(), 'foo9');
        assert.equal(node.getRight().getData(), 'bar9');
        assert.equal(node.getRight().getRight(), null);
        assert.equal(node.getRight().getLeft().getKey(), 'foo7');        
    });
    it('should insert a node into the binary tree', function() {
        var tree = Scule.getBinarySearchTree();
        for(var i=0; i < 100; i++) {
            var key = Scule.global.functions.randomFromTo(1, 100);
            tree.insert(key, key);
        }
        var verify = function(node) {
            if(!node) {
                return;
            }
            assert.equal(true, node.getRight() == null || node.getRight().getKey() > node.getKey());
            assert.equal(true, node.getLeft() == null || node.getLeft().getKey() <= node.getKey());
            verify(node.getRight());
            verify(node.getLeft());
        };
        verify(tree.getRoot());        
    });
    it('should search for a value in the binary tree', function() {
        var keys = {};
        var tree = Scule.getBinarySearchTree();
        for(var i=0; i < 100; i++) {
            var key = Scule.global.functions.randomFromTo(1, 1000);
            keys[key] = true;
            tree.insert(key, key);
        }
        for(var key in keys) {
            var node = tree.search(key);
            assert.equal(true, node.getKey() == key);
        }        
    });
    it('should turn the tree to an array', function() {
        var tree = Scule.getBinarySearchTree();
        for(var i=0; i < 100; i++) {
            var key = Scule.global.functions.randomFromTo(1, 1000);
            tree.insert(key, key);
        }
        var list = tree.toArray();
        for(var i=0; i < list.length; i++) {
            for(var j=i+1; j < list.length; j++) {
                assert.equal(true, list[i][0] <= list[j][0]);
            }
        }        
    });
    it('should balance the binary tree', function() {
        var tree = Scule.getBinarySearchTree();
        for(var i=0; i < 100; i++) {
            var key = Scule.global.functions.randomFromTo(1, 1000);
            tree.insert(key, key);
        }
        tree.balance();

        var verifyOrder = function(node) {
            if(!node) {
                return;
            }
            assert.equal(true, node.getRight() == null || node.getRight().getKey() > node.getKey());
            assert.equal(true, node.getLeft() == null || node.getLeft().getKey() <= node.getKey());
            verifyOrder(node.getRight());
            verifyOrder(node.getLeft());
        };
        verifyOrder(tree.getRoot());        
    });
});