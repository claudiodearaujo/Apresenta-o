# Day Tokeniza — Interactive Architecture Presentation

Interactive technical presentation for a tokenization proof of concept.

The project translates a financial-product idea into a visual narrative covering **product flow, architecture, token lifecycle and blockchain integration**.

## Purpose

Technical systems are easier to evaluate when architecture and product intent can be understood together.

This presentation was built to communicate:

- the business flow behind receivables tokenization;
- major system actors and responsibilities;
- how blockchain fits into the architecture;
- boundaries between application services and smart contracts;
- token lifecycle concepts;
- implementation considerations and trade-offs.

## Stack

- React 19
- TypeScript
- Vite
- Recharts
- Lucide React

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Companion smart contract

The Solidity proof of concept lives in:

[Day-Tokeniza-Smart-Contract](https://github.com/claudiodearaujo/Day-Tokeniza-Smart-Contract)

That repository explores the contract-level model for tokenized receivables, including metadata, transfers, settlement state and default state.

## What this project demonstrates

This repository is intentionally presentation-oriented. It demonstrates how I approach technical communication:

```text
Business problem
      ↓
Product flow
      ↓
System architecture
      ↓
Technical boundaries
      ↓
Implementation model
      ↓
Risks and trade-offs
```

The goal is not decorative slides. It is to make a complex technical proposal understandable to both engineering and non-engineering stakeholders.

## Related

- [Personal site](https://claudiodearaujo.dev.br)
- [GitHub profile](https://github.com/claudiodearaujo)

---

A communication artifact for an experimental tokenization proof of concept, not a production financial platform.
