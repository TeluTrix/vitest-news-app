import { expect, vi, describe, it } from "vitest";
import News from "../components/News.vue"
import {nextTick} from "vue";
import {mount} from "@vue/test-utils";
import axios from "axios";
import {testData} from "./data";

describe("News-Loading Tests", () => {
    expect(News).toBeTruthy();
    it("Should Mount", async () => {
        const wrapper = mount(News);
        expect(wrapper).toMatchSnapshot();
    });
    it("Should Load Articles", async () => {
        const spy = spyCreate();

        const wrapper = mount(News);
        expect(axios.get).toHaveBeenCalledTimes(1);
        await nextTick();

        const numberInput = wrapper.get("input");
        expect(wrapper.text()).toContain("News-1");
    });
    it("Should load Article-1", async () => {
        const spy = spyCreate();

        const wrapper = mount(News);
        expect(axios.get).toHaveBeenCalledTimes(1);
        await nextTick();

        const numberInput = wrapper.get("input");
        await numberInput.setValue("1");

        await nextTick();
        expect(wrapper.text()).toContain("News-1");
    })
    it("Should load Article 1 & 2", async () => {
        const spy = spyCreate();

        const wrapper = mount(News);
        expect(axios.get).toHaveBeenCalledTimes(1);
        await nextTick();

        const numberInput = wrapper.get("input");
        await numberInput.setValue("2");

        await nextTick();
        expect(wrapper.text()).toContain("News-1");
        expect(wrapper.text()).toContain("News-2");
        expect(wrapper.text()).not.toContain("News-3");
        expect(wrapper.text()).not.toContain("News-4");
        expect(wrapper.text()).not.toContain("News-5");
        expect(wrapper.text()).not.toContain("News-6");
    })
    it("Should load Article 1-6", async () => {

        const spy = spyCreate();

        const wrapper = mount(News);
        expect(axios.get).toHaveBeenCalledTimes(1);
        await nextTick();

        const numberInput = wrapper.get("input");
        await numberInput.setValue("2");

        await nextTick();

        //Check if all Mock-News rendered & shown
        expect(wrapper.text()).toContain("News-1");
        expect(wrapper.text()).toContain("News-2");
        expect(wrapper.text()).toContain("News-3");
        expect(wrapper.text()).toContain("News-4");
        expect(wrapper.text()).toContain("News-5");
        expect(wrapper.text()).toContain("News-6");
    })
    function spyCreate(){
        const spy = vi.spyOn(axios, "get");
        spy.mockResolvedValueOnce({
            data: testData,
        });
        return spy;
    }
});