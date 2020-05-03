import React from "react";
import styled from "styled-components";
import Product from "../Product/Product";
import { Grid, Container } from "@material-ui/core";
import { products } from "../../data/products";
import { selectOrderedObjects } from "../../services/data/selectors";
import { menuSections } from "../../services/parameters/sectionViews";

const MuiContainer = styled(Container)`
  padding: 16px 0 80px;
`;

const Section = ({ storeAndActions }) => {
  const { sectionNumber } = storeAndActions.store;
  const section = menuSections[sectionNumber];

  const sectionProducts = selectOrderedObjects(section.products, products);

  return (
    <MuiContainer maxWidth="md">
      <Grid container justify="center" spacing={4}>
        {sectionProducts &&
          sectionProducts.map((product, i) => (
            <Product
              key={i}
              product={product}
              storeAndActions={storeAndActions}
            />
          ))}
      </Grid>
    </MuiContainer>
  );
};

export default Section;
