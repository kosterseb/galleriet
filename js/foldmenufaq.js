// Load GSAP
document.addEventListener("DOMContentLoaded", function () {
    // Check if GSAP is loaded, if not, load it
    if (typeof gsap === "undefined") {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
        script.onload = initFaqFunctionality;
        document.head.appendChild(script);
    } else {
        initFaqFunctionality();
    }

    function initFaqFunctionality() {
        const faqQuestions = document.querySelectorAll(".faq-question");
        const faqItems = document.querySelectorAll(".faq-item");

        faqItems.forEach((item, index) => {
            const question = item.querySelector(".faq-question");
            const answer = item.querySelector(".faq-answer");
            const toggleBtn = item.querySelector(".toggle-btn");
            let isOpen = false;
            let animating = false;

            question.addEventListener("click", () => {
                if (animating) return;

                animating = true;

                if (!isOpen) {
                    // Open this FAQ item
                    answer.style.display = "block";
                    const targetHeight = answer.scrollHeight;

                    gsap.fromTo(answer,
                        { height: 0 },
                        {
                            duration: 0.4,
                            height: targetHeight,
                            ease: "power2.out",
                            onComplete: () => {
                                answer.style.height = "auto";
                                isOpen = true;
                                animating = false;
                            }
                        }
                    );


                    faqItems.forEach((otherItem, otherIndex) => {
                        if (otherIndex !== index) {
                            const otherAnswer = otherItem.querySelector(".faq-answer");
                            const otherToggleBtn = otherItem.querySelector(".toggle-btn");
                            if (otherItem !== item && otherAnswer.style.display === "block") {
                                const currentHeight = otherAnswer.scrollHeight;

                                gsap.fromTo(otherAnswer,
                                    { height: currentHeight },
                                    {
                                        duration: 0.4,
                                        height: 0,
                                        ease: "power2.out",
                                        onComplete: () => {
                                            otherAnswer.style.display = "none";
                                            otherItem.classList.remove("open");
                                            isOpen = false;
                                            animating = false;
                                        }
                                    }
                                );

                                // Toggle button back to "+"
                                otherToggleBtn.classList.remove("active");
                            }
                        }
                    });

                    // Toggle button to "+"
                    toggleBtn.classList.add("active");
                } else {
                    // Close this FAQ item
                    const currentHeight = answer.scrollHeight;

                    gsap.fromTo(answer,
                        { height: currentHeight },
                        {
                            duration: 0.4,
                            height: 0,
                            ease: "power2.out",
                            onComplete: () => {
                                answer.style.display = "none";
                                isOpen = false;
                                animating = false;
                            }
                        }
                    );

                    // Toggle button back to "+"
                    toggleBtn.classList.remove("active");
                }
            });
        });
    }
});
