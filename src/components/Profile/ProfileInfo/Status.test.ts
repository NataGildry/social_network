import React from 'react';
import { create } from 'react-test-renderer';
import Status from './Status';

describe('Status component', () => {
    test('status from props should be in the state', () => {
        const component = create(<Status status="STATUS OF USER" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("STATUS OF USER");
    });
    test('after creation <span> should be displayed', () => {
        const component = create(<Status status="STATUS OF USER" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.length).not.toBeNull();
    });
    test("after creation <span> should be displayed with correct status", () => {
        const component = create(<Status status="STATUS OF USER" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("STATUS OF USER");
    });
    test('after creation <input> should not be displayed', () => {
        const component = create(<Status status="STATUS OF USER" />);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();
    });
    test("<input> should be displayed in editMode instead of <span>", () => {
        const component = create(<Status status="STATUS OF USER" />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.length).not.toBeNull();
    });
    test("<input> should be displayed in editMode instead of <span> with correct status", () => {
        const component = create(<Status status="STATUS OF USER" />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe('STATUS OF USER');
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = create(<Status status="STATUS OF USER" updateUserStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});
