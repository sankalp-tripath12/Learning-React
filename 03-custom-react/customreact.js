function customRender(reactElement, container) {
    const domElement = document.createElement(reactElement.type)

    // Add children
    domElement.innerHTML = reactElement.children

    // Set attributes
    for (const prop in reactElement.props) {
        domElement.setAttribute(prop, reactElement.props[prop])
    }

    container.appendChild(domElement)
}

const reactElement = {
    type: "a",
    props: {
        href: "https://google.com",
        target: "_blank"
    },
    children: "Click me to visit Google"
}

// सही तरीका 👇
const container = document.querySelector("#root")

customRender(reactElement, container)