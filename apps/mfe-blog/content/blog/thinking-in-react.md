---
title: 'Thinking in React: A Step-by-Step Approach'
date: '2024-11-12'
description: '"Thinking in React" is a methodical process of breaking down UIs into components, managing state, and adding interactivity through a structured flow. It emphasizes building a static version first, identifying minimal state, and ensuring clear data flow between parent and child components.'
tags: ['react', 'javascript', 'frontend']
readingTime: 8
---

React, the popular JavaScript library for building user interfaces, emphasizes one fundamental concept: **components**. Components allow you to break down the UI into reusable, isolated pieces of code. When building React applications, adopting a structured approach can significantly improve your workflow and code quality. One such approach is called **Thinking in React**, introduced by React's official documentation. It guides developers in breaking down UIs into manageable components and managing their state effectively.

Here's a breakdown of the process of Thinking in React:

## 1. Start with a Mockup

The first step is to have a visual reference of what you're building. Whether it's a design from a team or a quick wireframe you've created, having a clear visual model helps you envision the structure of your UI. This mockup could be a sketch or a polished design.

For example, let's say you are building a product listing page for an e-commerce app. Your mockup may include a search bar, a product list, and individual product components displaying name, price, and availability.

![Thinking in React UI](/blog-assets/s_thinking-in-react_ui.png)

## 2. Break the UI into Components

The key to React development is breaking down the UI into a component hierarchy. Each part of the UI corresponds to a component, which can be either a functional or class component, depending on your needs.

To start breaking down the UI, look for:

- **Single responsibility**: A component should do one thing, and do it well.
- **Reusability**: Consider if the component can be reused elsewhere in your application.
- **State management**: Think about which components need to store or manipulate data.

Let's break down the e-commerce example:

- **SearchBar**: Manages user input for filtering products.
- **ProductTable**: Displays the filtered products.
- **ProductCategoryRow**: Groups products by category.
- **ProductRow**: Displays individual product details.

![Thinking in React UI outline](/blog-assets/s_thinking-in-react_ui_outline.png)

Here's what the hierarchy could look like:

```text
FilterableProductTable
    SearchBar
    ProductTable
        ProductCategoryRow
        ProductRow
```

## 3. Build a Static Version in React

Once you've identified the components, the next step is to build a static version of your UI. This version has no interactivity yet—just render the components using props.

Static versions allow you to focus solely on the structure and styling without worrying about state or behavior. It's a good practice to work from the top component down (also called top-down approach) or from the smaller components up (bottom-up approach).

For the e-commerce example, you would start by rendering static data. Pass the data through props from the top-level component down to the lower-level components (e.g., `ProductRow` receives product data via props).

```jsx
function ProductRow({ product }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  )
}
```

## 4. Identify the Minimal Representation of State

Once the static UI is built, it's time to think about which parts of the UI should be dynamic. In React, interactivity is achieved through **state**.

To figure out what should be stateful, ask yourself these questions:

- Is it passed in from a parent via props? If yes, it probably isn't state.
- Does it change over time? If yes, it might be state.
- Can you compute it based on other state or props? If yes, then it shouldn't be state.

In our example, the search input, the current filter, and the list of products that match the filter are stateful.

## 5. Determine Where Your State Should Live

React's one-way data flow means that state lives in the component that manages it and passes it down as props. But where should state reside?

To decide, look for the closest common ancestor component that requires the state. This component will own the state and pass it down to its children.

For our e-commerce app, the state for the filtered products should live in `FilterableProductTable`, since it's the common parent of `SearchBar` and `ProductTable`.

```jsx
function FilterableProductTable() {
  const [filterText, setFilterText] = useState("")
  const [products, setProducts] = useState(PRODUCTS)

  // Pass state and handlers to child components
  return (
    <div>
      <SearchBar filterText={filterText} setFilterText={setFilterText} />
      <ProductTable products={products} filterText={filterText} />
    </div>
  )
}
```

## 6. Add Inverse Data Flow

Sometimes child components need to communicate back up to their parent, like when a user types into the search input. This is achieved by passing **callbacks** down from the parent component.

For instance, `SearchBar` needs to inform `FilterableProductTable` when the user enters text. To achieve this, pass a callback function as a prop from `FilterableProductTable` to `SearchBar`, allowing the search term to be lifted up into the state of the parent component.

```jsx
function SearchBar({ filterText, setFilterText }) {
  return (
    <input
      type="text"
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
      placeholder="Search..."
    />
  )
}
```

Now, when the input changes, the state in the parent component is updated, triggering a re-render that propagates the new filtered data.

## Conclusion

**Thinking in React** is about systematically breaking down your UI into components, managing state effectively, and creating a clean, maintainable structure. By following the steps outlined—starting with a static version, identifying minimal state, and ensuring proper data flow—you can build scalable React applications with ease.

This approach is not only efficient but also makes your codebase easier to understand, test, and extend.

### References

1. [Thinking in React - Official React Documentation](https://reactjs.org/docs/thinking-in-react.html)
2. [React: Getting Started](https://reactjs.org/docs/getting-started.html)
3. [Component Architecture](https://handsonreact.com/docs/component-architecture)
