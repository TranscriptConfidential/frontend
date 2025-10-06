"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  GraduationCap,
  Shield,
  Settings,
  FileText,
  Award,
  Wallet,
  CheckCircle2,
  XCircle,
  Loader2,
  Upload,
  File,
} from "lucide-react";
import { useMetaMaskEthersSigner } from "@/hooks/metamask/useMetaMaskEthersSigner";
import { FileObject, PinataSDK } from 'pinata-web3';

export default function ConfidentialTranscriptDashboard() {

  const [walletConnected, setWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [txHash, setTxHash] = useState("")

  // Admin/Owner functions
  const [newUniAddress, setNewUniAddress] = useState("")
  const [newPGAddress, setNewPGAddress] = useState("")

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedCID, setUploadedCID] = useState("")
  const [cidAsNumber, setCidAsNumber] = useState("")

//   const [cidToNumber_, setCidToNumber_] = useState("")
//   const [numberToCid_, setNumberToCid_] = useState("")

  // University functions
  const [studentAddress, setStudentAddress] = useState("")
  const [studentID, setStudentID] = useState("")
  const [encCID, setEncCID] = useState("")
  const [encGPA, setEncGPA] = useState("")
  const [inputProof, setInputProof] = useState("")

  // PG Authority functions
  const [checkStudentAddress, setCheckStudentAddress] = useState("")
  const [gpaThreshold, setGpaThreshold] = useState("350")

  // Student functions
  const [tokenIdToRevoke, setTokenIdToRevoke] = useState("");

  const { acount, isConnected, disconnect, connect } = useMetaMaskEthersSigner();

  const connectWallet = async () => {
    setLoading(true)
    // Simulate wallet connection
    connect();
    setTimeout(() => {
      setWalletConnected(true)
      setWalletAddress(acount);
      setLoading(false)
    }, 1000)
  }

  const disconnectWallet = () => {
    disconnect();
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === "application/pdf") {
        setSelectedFile(file)
      } else {
        alert("Please select a PDF file")
      }
    }
  }

   const numberToCid = (numStr: string): string => {
    // Note: This is a simplified reverse conversion
    // In production, you should store the CID mapping or use proper CID encoding
    try {
      let num = BigInt(numStr)
      let result = ""
      while (num > 0n) {
        result = String.fromCharCode(Number(num % 256n)) + result
        num = num / 256n
      }
      return result
    } catch (error) {
      console.error("[v0] Error converting number to CID:", error)
      return ""
    }
  }

  const cidToNumber = (cid: string): string => {
    // Remove 'Qm' prefix if present (CIDv0) or decode CIDv1
    // For simplicity, we'll convert the CID string to a BigInt using its hash
    // In production, use a proper CID library like 'multiformats'

    // Simple conversion: take the base58 decoded bytes as a number
    // For demo purposes, we'll use a hash of the CID string
    let hash = 0n
    for (let i = 0; i < cid.length; i++) {
      hash = hash * 256n + BigInt(cid.charCodeAt(i))
    }
    return hash.toString()
  }

  const handleUploadToPinata = async () => {
    if (!selectedFile) {
      alert("Please select a file first")
      return
    }


    setUploading(true)

    try {

      const pinata = new PinataSDK({
            pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
            pinataGateway: 'https://ipfs.io',
      });
      const response = await pinata.upload.file(selectedFile);


      console.log(response);
      if (!response) {
        throw new Error("Upload failed")
      }

      const cid = response.IpfsHash;

      setUploadedCID(cid)

      // Convert CID to number
      const cidNumber = cidToNumber(cid)
      setCidAsNumber(cidNumber)

      // Auto-populate the encrypted CID field
      setEncCID(cidNumber);
      console.log(cidNumber)

      console.log("[v0] Uploaded to Pinata:", cid)
      console.log("[v0] CID as number:", cidNumber)
    } catch (error) {
      console.error("[v0] Upload error:", error)
      alert("Failed to upload to Pinata. Please check your API credentials.")
    } finally {
      setUploading(false)
    }
  }

  const handleSetUniversity = async () => {
    setLoading(true)
    // Contract interaction would go here
    setTimeout(() => {
      setTxHash("0x" + Math.random().toString(16).substring(2, 66))
      setLoading(false)
    }, 2000)
  }

  const handleSetPGAddress = async () => {
    setLoading(true)
    setTimeout(() => {
      setTxHash("0x" + Math.random().toString(16).substring(2, 66))
      setLoading(false)
    }, 2000)
  }

  const handleMintTranscript = async () => {
    setLoading(true)
    setTimeout(() => {
      setTxHash("0x" + Math.random().toString(16).substring(2, 66))
      setLoading(false)
    }, 2000)
  }

  const handleCheckEligibility = async () => {
    setLoading(true)
    setTimeout(() => {
      setTxHash("0x" + Math.random().toString(16).substring(2, 66))
      setLoading(false)
    }, 2000)
  }

  const handleRevokeTranscript = async () => {
    setLoading(true)
    setTimeout(() => {
      setTxHash("0x" + Math.random().toString(16).substring(2, 66))
      setLoading(false)
    }, 2000)
  }

  const handleDecryptCID = async () => {
    setLoading(true)
    setTimeout(() => {
      setTxHash("0x" + Math.random().toString(16).substring(2, 66))
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Confidential Transcript</h1>
              <p className="text-sm text-muted-foreground">FHE-Powered Academic Records</p>
            </div>
          </div>

          {!walletConnected ? (
            <Button onClick={connectWallet} disabled={loading} className="bg-primary hover:bg-primary/90">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect Wallet
                </>
              )}
            </Button>
          ) : (
            <div className="flex items-center gap-3">
                {/* <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                <button className="cursor-pointer" onClick={disconnectWallet}>Disconnect</button></Badge> */}
              <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Connected
              </Badge>
              <code className="text-sm text-muted-foreground font-mono">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
              </code>
            </div>
          )}
          
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!walletConnected ? (
          <Card className="max-w-md mx-auto mt-20 bg-card border-border">
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-foreground">Connect Your Wallet</CardTitle>
              <CardDescription className="text-muted-foreground">
                Connect your wallet to interact with the Confidential Transcript contract
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={connectWallet} className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  "Connect Wallet"
                )}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {txHash && (
              <Alert className="mb-6 bg-success/10 border-success/30">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <AlertDescription className="text-success-foreground">
                  Transaction successful: <code className="text-xs font-mono">{txHash}</code>
                </AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="admin" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-card border border-border">
                <TabsTrigger
                  value="admin"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </TabsTrigger>
                <TabsTrigger
                  value="university"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  University
                </TabsTrigger>
                <TabsTrigger
                  value="pg-authority"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  PG Authority
                </TabsTrigger>
                <TabsTrigger
                  value="student"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Student
                </TabsTrigger>
              </TabsList>

              {/* Admin Tab */}
              <TabsContent value="admin" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <Settings className="w-5 h-5 text-primary" />
                        Set University Address
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Update the authorized university address (Owner only)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="uni-address" className="text-foreground">
                          University Address
                        </Label>
                        <Input
                          id="uni-address"
                          placeholder="0x..."
                          value={newUniAddress}
                          onChange={(e) => setNewUniAddress(e.target.value)}
                          className="bg-input border-border text-foreground font-mono"
                        />
                      </div>
                      <Button
                        onClick={handleSetUniversity}
                        disabled={loading || !newUniAddress}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Set University"
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <Shield className="w-5 h-5 text-primary" />
                        Set PG Authority Address
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Update the post-graduate authority address (Owner only)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="pg-address" className="text-foreground">
                          PG Authority Address
                        </Label>
                        <Input
                          id="pg-address"
                          placeholder="0x..."
                          value={newPGAddress}
                          onChange={(e) => setNewPGAddress(e.target.value)}
                          className="bg-input border-border text-foreground font-mono"
                        />
                      </div>
                      <Button
                        onClick={handleSetPGAddress}
                        disabled={loading || !newPGAddress}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Set PG Authority"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* University Tab */}
              <TabsContent value="university" className="space-y-6">
                <div className="grid gap-6">

                {/* <p>convert from cid to number</p>
                <input type="text" placeholder="convert from cid to number" onChange={(e) => setCidToNumber_(e.target.value)} />
                <button className="cursor-pointer" onClick={() => {
                    console.log("convert from cid to number");
                    console.log(cidToNumber_);
                    const res = cidToNumber(cidToNumber_);
                    console.log(res);
                }}>convert..</button> */}

                {/* <p>convert from number to cid</p>
                <input type="text" placeholder="convert from number to cid" onChange={(e) => setNumberToCid_(e.target.value)} />
                <button className="cursor-pointer" onClick={() => {
                    console.log("convert from number to cid");
                    console.log(numberToCid_);
                    const res = numberToCid(numberToCid_);
                    console.log(res);
                }}>convert..</button> */}

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <Upload className="w-5 h-5 text-primary" />
                        Upload Transcript to IPFS
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Upload PDF transcript to Pinata and get CID for minting
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
 
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pdf-upload" className="text-foreground">
                          Select PDF Transcript
                        </Label>
                        <div className="flex gap-2">
                          <Input
                            id="pdf-upload"
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileSelect}
                            className="bg-input border-border text-foreground"
                          />
                        </div>
                        {selectedFile && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <File className="w-4 h-4" />
                            <span>{selectedFile.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {(selectedFile.size / 1024).toFixed(2)} KB
                            </Badge>
                          </div>
                        )}
                      </div>

                      <Button
                        onClick={handleUploadToPinata}
                        disabled={uploading || !selectedFile}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Uploading to IPFS...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload to Pinata
                          </>
                        )}
                      </Button>

                      {uploadedCID && (
                        <Alert className="bg-success/10 border-success/30">
                          <CheckCircle2 className="h-4 w-4 text-success" />
                          <AlertDescription className="space-y-2">
                            <div className="text-success-foreground">
                              <strong>Upload successful!</strong>
                            </div>
                            <div className="text-xs space-y-1">
                              <div>
                                <span className="text-muted-foreground">CID:</span>{" "}
                                <code className="text-foreground font-mono">{uploadedCID}</code>
                              </div>
                              <div>
                                <span className="text-muted-foreground">CID as Number:</span>{" "}
                                <code className="text-foreground font-mono text-xs break-all">{cidAsNumber}</code>
                              </div>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        Mint Transcript
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Issue an encrypted transcript to a student (University only)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="student-address" className="text-foreground">
                            Student Address
                          </Label>
                          <Input
                            id="student-address"
                            placeholder="0x..."
                            value={studentAddress}
                            onChange={(e) => setStudentAddress(e.target.value)}
                            className="bg-input border-border text-foreground font-mono"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="student-id" className="text-foreground">
                            Student ID
                          </Label>
                          <Input
                            id="student-id"
                            placeholder="12345"
                            value={studentID}
                            onChange={(e) => setStudentID(e.target.value)}
                            className="bg-input border-border text-foreground"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="enc-cid" className="text-foreground">
                            Encrypted CID {/* Added helper text */}
                            {uploadedCID && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Auto-filled
                              </Badge>
                            )}
                          </Label>
                          <Input
                            id="enc-cid"
                            placeholder="cid as number"
                            value={encCID}
                            onChange={(e) => setEncCID(e.target.value)}
                            className="bg-input border-border text-foreground font-mono"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="enc-gpa" className="text-foreground">
                            GPA
                          </Label>
                          <Input
                            id="enc-gpa"
                            placeholder="Gpa"
                            value={encGPA}
                            onChange={(e) => setEncGPA(e.target.value)}
                            className="bg-input border-border text-foreground font-mono"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={handleMintTranscript}
                        disabled={loading || !studentAddress || !studentID}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Minting...
                          </>
                        ) : (
                          "Mint Transcript"
                        )}
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <XCircle className="w-5 h-5 text-destructive" />
                        Revoke Transcript
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        Revoke a student's transcript by token ID
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="revoke-token" className="text-foreground">
                          Token ID
                        </Label>
                        <Input
                          id="revoke-token"
                          placeholder="12345"
                          value={tokenIdToRevoke}
                          onChange={(e) => setTokenIdToRevoke(e.target.value)}
                          className="bg-input border-border text-foreground"
                        />
                      </div>
                      <Button
                        onClick={handleRevokeTranscript}
                        disabled={loading || !tokenIdToRevoke}
                        variant="destructive"
                        className="w-full"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Revoking...
                          </>
                        ) : (
                          "Revoke Transcript"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* PG Authority Tab */}
              <TabsContent value="pg-authority" className="space-y-6">
                <Card className="bg-card border-border max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <Award className="w-5 h-5 text-primary" />
                      Check Scholarship Eligibility
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Verify if a student meets the GPA threshold without revealing their actual GPA
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="check-student" className="text-foreground">
                        Student Address
                      </Label>
                      <Input
                        id="check-student"
                        placeholder="0x..."
                        value={checkStudentAddress}
                        onChange={(e) => setCheckStudentAddress(e.target.value)}
                        className="bg-input border-border text-foreground font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="threshold" className="text-foreground">
                        GPA Threshold (scaled by 100)
                      </Label>
                      <Input
                        id="threshold"
                        type="number"
                        placeholder="350"
                        value={gpaThreshold}
                        onChange={(e) => setGpaThreshold(e.target.value)}
                        className="bg-input border-border text-foreground"
                      />
                      <p className="text-xs text-muted-foreground">Example: 350 = 3.50 GPA</p>
                    </div>
                    <Button
                      onClick={handleCheckEligibility}
                      disabled={loading || !checkStudentAddress}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Checking...
                        </>
                      ) : (
                        "Check Eligibility"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Student Tab */}
              <TabsContent value="student" className="space-y-6">
                <Card className="bg-card border-border max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <FileText className="w-5 h-5 text-primary" />
                      Decrypt Your CID
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Request decryption of your transcript's CID
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert className="bg-muted/50 border-border">
                      <AlertDescription className="text-muted-foreground">
                        This will initiate a decryption request for your encrypted CID. The decrypted value will be
                        available after the callback is processed.
                      </AlertDescription>
                    </Alert>
                    <Button
                      onClick={handleDecryptCID}
                      disabled={loading}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Requesting...
                        </>
                      ) : (
                        "Request CID Decryption"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  )
};