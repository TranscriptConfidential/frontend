# 🎓 Transcript Confidential: FHE-Powered Academic Transcripts

A decentralized academic record and scholarship verification system built with **[Zama's](https://docs.zama.ai) Fully Homomorphic Encryption (FHE)**.
This dApp enables **Wagmi State University (WSU)** to issue encrypted academic transcripts and allows postgraduate authorities to verify students’ scholarship eligibility **without revealing their CGPA or transcript**.
> This proof-of-concept demonstrates how Zama’s FHE can enforce privacy by ensuring only authorized parties can access specific information, while others cannot. It also showcases blind computation, allowing postgraduate authorities to verify a student’s scholarship eligibility by securely computing on the encrypted CGPA — without ever decrypting it.

---

## 🚀 Overview

The ConfidentialTranscript contract represents each student’s transcript as a SBT, linked to an IPFS folder containing their academic record.

-   University staff can set transcript issuer (Uni) and scholarship-checking (PG) addresses.
-   Students can decrypt and retrieve their transcript IPFS path privately.
-   Post-graduate (PG) authorities can check student scholarship eligibility based on the CGPA threshold.

All transcript files are off-chain on IPFS, while metadata and CGPA validation are on-chain.

---

## 🏗️ How It Works

### 1. 🧑‍💼 Admin Dashboard

This is the entry page for authorized university staff.

-   Set the University Address — the issuer of student transcripts.
-   Set the Post-Graduate (PG) Address — the address that can verify student scholarship eligibility.
-   Both addresses are stored in the smart contract.

---

### 2. 🏫 University Transcript Upload Flow

1. Prepare student transcripts:
   Each class set (e.g. 2025) has its transcripts stored in a folder named like:

-   The file naming format:

    [ClassYear][StudentID][7-digit random number]
    Example:

    -   25 → Class of 2025
    -   01 → Student ID (enumerated alphabetically)
    -   9720801 → Random digits for extra security

        Filename: 2501972081.pdf

2. Upload folder containing student transcripts to IPFS (via [Pinata](https://www.app.pinata.cloud) or similar) and get its CID e.g:
   bafybeicaovgk5reqfzqotlfdk3ul4kwlfr7qdkoivmf3zoku7st43vwmta

3. Mint students’ transcript via the University dashboard:

-   Input:
    -   Student Address (e.g., 0x1234...abcd)
    -   Student ID (e.g., 01)
    -   CID Number (the filename, e.g., 2501972081)
    -   CGPA (e.g., 3.52)
-   On mint:
    -   The contract uses Zama’s encryption to securely store the student’s CID Number and CGPA.
    -   Each transcript is linked to the student’s address as a Soulbound Token (SBT), providing access to that specific address.
    -   Only the corresponding student’s address can decrypt their CID and retrieve their transcript.

---

### 3. 🧑‍🎓 Student Portal

Each student can access their transcript using the “Reveal Transcript” button. When clicked, the dApp performs the following steps:

1. Retrieves the base IPFS hash of the class folder.
2. Decrypts and appends the student’s CID number (used as their filename).
3. Generates the full IPFS path, e.g:
   https://ipfs.io/ipfs/bafybeicaovgk5reqfzqotlfdk3ul4kwlfr7qdkoivmf3zoku7st43vwmta/2501972081
4. The student can then open the link to view or download their transcript.

---

### 4. 🎓 Check Student Scholarship Eligibility

On the Scholarship Check tab, the Postgraduate (PG) staff provides:

-   Student Address (e.g., 0x1234...abcd)
-   CGPA Threshold (e.g., 3.5)

When “Check Student Eligibility” is clicked:

-   The smart contract retrieves the student’s encrypted CGPA and compares it with the provided threshold.
-   It then returns one of the following results:
-   ✅ “This student is eligible for a scholarship.” – if the CGPA meets or exceeds the threshold.
-   ❌ “This student is not eligible for a scholarship.” – if the CGPA is below the threshold.

Note:

-   The PG address cannot access the student’s transcript or personal data; it can only verify eligibility without revealing the student’s actual CGPA or CID.

---

## 🧩 Smart Contract Summary

### Contract: ConfidentialTranscript

Each transcript is represented by this struct:

```solidity
struct TranscriptRecord {
    address issuer; // university address
    address owner; // student address
    euint256 encCID; // encrypted CID (filename)
    euint16 encGPA; // encrypted CGPA
    uint256 issuedAt; // timestamp
}
```

| Function                                                                                                                                   | Access     | Description                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- | -------------------------------------------- |
| `constructor(address _uni_address, address _pg_address)`                                                                                   | Owner      | Set up Uni address, PG address               |
| `mintTranscriptExternal(address student, uint256 studentID, externalEuint256 _encCID, externalEuint16 _encGpa, bytes calldata inputProof)` | University | Issues a new transcript SBT to a student     |
| `decryptCid()`                                                                                                                             | Student    | Requests decryption for their CID            |
| `checkScholarshipEligibilityByAddress(address student, uint16 threshold)`                                                                  | PG         | Returns true if CGPA ≥ threshold, else false |
| `setUniversity(address _uni_address)`                                                                                                      | Owner      | Updates the university issuer address        |
| `setPGAddress(address _pg_address)`                                                                                                        | Owner      | Updates the PG scholarship checker address   |

---

## ⚙️ Developer Setup

1. Clone the repository

```sh
git clone https://github.com/TranscriptConfidential/frontend
```

```sh
cd packages/site
```

2. Install dependencies

```sh
npm install
```

3. Compile contracts

```sh
npx hardhat compile
```

4. Deploy locally

```sh
npx hardhat run scripts/deploy.js --network localhost
```

5. Run locally

```sh
npm run dev
```

---

### ⚠️ Current Limitation:

In the current implementation, all students share the same base IPFS hash for transcript storage.
This means that anyone who obtains the shared hash could potentially enumerate and access other students’ transcripts.

---

## 🔐 Future Upgrades

To make the system more scalable, user-friendly, and adaptable for multiple institutions, future improvements will include:

-   Each student’s transcript will be associated with a unique IPFS hash.
    This IPFS hash will be encoded into a 256-bit representation and encrypted using Zama’s euint256, ensuring that no one can access other students’ transcripts.
-   Integrate transcript upload to IPFS directly on the school website, reducing manual handling.
-   Support batch minting of student transcripts for entire classes.
-   Extend the system to onboard multiple universities, each with its own issuer address and PG authority.

---

## 📜 License

This project is licensed under the BSD-3-Clause-Clear License - see the [LICENSE FILE](./license) for details.

---

## 👥 Contributors

This project was developed by:

-   [0xBitzz](https://github.com/0xBitzz) – Backend & Smart Contract Development
-   [airishGuy](https://github.com/airishGuy) – Frontend & dApp Integration
