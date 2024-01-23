import { TimelineDefinition, timeline } from "motion";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = () => {

 const transitionElement = document.getElementById("transition-element");
 const logoElement = document.getElementById("transition-logo")

 if (transitionElement && logoElement) {
  timeline(
   [
    [logoElement, { scale: "0" }, { at: 0.35 }],
    [logoElement, { opacity: "0" }, { at: 0.6 }],
    [transitionElement, { y: "-100vh" }, { at: 0.65 }]
   ] as TimelineDefinition,
   {
    defaultOptions: { easing: [0.75, 0, 0.2, 1], duration: 1, delay: 0 },
   }
  );
 }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {

 const animationWrapper = document.getElementById("transition-element");
 const logoElement = document.getElementById("transition-logo")

 if (animationWrapper && logoElement) {
  timeline(
   [[animationWrapper, { y: 0 }, { at: 0, duration: 0.35 }]] as TimelineDefinition,
   { defaultOptions: { easing: [0.75, 0, 0.2, 1], duration: 0.35, delay: 0 } }
  ).finished.then(() => {
   router.replace(href)
  })
 }
};