from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
import uvicorn

from risk_engine import calculate_risk_score, get_risk_reasons
from database import init_db, save_analysis, get_recent_analyses

app = FastAPI(
    title="Instagram Account Risk Detector API",
    description="Professional API for detecting Instagram account risks and scam indicators",
    version="2.0.0"
)

# CORS middleware for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
init_db()


class InstagramAccountInput(BaseModel):
    username: str
    followers: Optional[int] = None
    following: Optional[int] = None
    posts: Optional[int] = None
    account_age_days: Optional[int] = None
    verified: Optional[bool] = None
    visibility: Optional[str] = None
    has_profile_pic: Optional[str] = None
    bio_text: Optional[str] = None
    bio_links: Optional[str] = None
    dm_activity: Optional[str] = None


class RiskAnalysisResponse(BaseModel):
    username: str
    risk_score: int
    risk_level: str
    confidence: int
    confidence_label: str
    reasons: List[str]
    recommendations: List[str]
    timestamp: str


@app.get("/")
async def root():
    return {
        "message": "Instagram Account Risk Detector API",
        "version": "2.0.0",
        "status": "active",
        "docs": "/docs"
    }


@app.post("/api/analyze", response_model=RiskAnalysisResponse)
async def analyze_account(account: InstagramAccountInput):
    """
    Analyze an Instagram account for risk indicators
    """
    try:
        # Calculate risk score and get detailed analysis
        risk_data = calculate_risk_score(account.dict())
        
        # Get reasons for the risk score
        reasons = get_risk_reasons(account.dict(), risk_data)
        
        # Generate recommendations
        recommendations = generate_recommendations(risk_data["risk_level"], reasons)
        
        # Prepare response
        response = {
            "username": account.username,
            "risk_score": risk_data["risk_score"],
            "risk_level": risk_data["risk_level"],
            "confidence": risk_data["confidence"],
            "confidence_label": risk_data["confidence_label"],
            "reasons": reasons,
            "recommendations": recommendations,
            "timestamp": datetime.now().isoformat()
        }
        
        # Save to database
        save_analysis(response)
        
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@app.get("/api/history")
async def get_history(limit: int = 10):
    """
    Get recent analysis history
    """
    try:
        analyses = get_recent_analyses(limit)
        return {"history": analyses, "count": len(analyses)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch history: {str(e)}")


def generate_recommendations(risk_level: str, reasons: List[str]) -> List[str]:
    """Generate safety recommendations based on risk level"""
    recommendations = []
    
    if risk_level == "High Risk":
        recommendations.append("⚠️ DO NOT interact with this account or click any links")
        recommendations.append("🚫 Block this account immediately")
        recommendations.append("📢 Report this account to Instagram for suspicious activity")
        recommendations.append("🔒 Never share personal information or payment details")
    elif risk_level == "Moderate Risk":
        recommendations.append("⚡ Exercise extreme caution when interacting")
        recommendations.append("🔍 Verify account authenticity through official channels")
        recommendations.append("❌ Avoid clicking on external links in bio or messages")
        recommendations.append("👥 Check if mutual friends follow this account")
    else:
        recommendations.append("✅ Account appears relatively safe based on available data")
        recommendations.append("🛡️ Still verify identity before sharing sensitive information")
        recommendations.append("📱 Be cautious of unsolicited messages or requests")
    
    # Add specific recommendations based on reasons
    if any("profile picture" in r.lower() for r in reasons):
        recommendations.append("🖼️ Missing profile picture is a common scam indicator")
    
    if any("external link" in r.lower() for r in reasons):
        recommendations.append("🔗 Never click suspicious links - they may be phishing attempts")
    
    if any("follower" in r.lower() for r in reasons):
        recommendations.append("📊 Unusual follower patterns suggest automated/fake account")
    
    return recommendations


if __name__ == "__main__":
    print("Starting Instagram Account Risk Detector API...")
    print("API Documentation: http://127.0.0.1:8000/docs")
    print("API Base URL: http://127.0.0.1:8000")
    uvicorn.run(app, host="127.0.0.1", port=8000)
