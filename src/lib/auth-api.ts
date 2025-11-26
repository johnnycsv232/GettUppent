import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from './firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';

/**
 * 🔐 API Route Authentication Middleware
 * 
 * Validates Firebase ID tokens from the Authorization header.
 * Use this to protect all /api/admin/* routes.
 * 
 * Usage in API route:
 * ```
 * import { validateAuth, withAuth } from '@/lib/auth-api';
 * 
 * export async function GET(req: NextRequest) {
 *   const authResult = await validateAuth(req);
 *   if (!authResult.success) return authResult.response;
 *   
 *   // authResult.user contains the decoded token
 *   const userId = authResult.user.uid;
 *   // ... your logic
 * }
 * ```
 */

interface AuthSuccess {
    success: true;
    user: DecodedIdToken;
}

interface AuthFailure {
    success: false;
    response: NextResponse;
}

export type AuthResult = AuthSuccess | AuthFailure;

export async function validateAuth(req: NextRequest): Promise<AuthResult> {
    try {
        const authHeader = req.headers.get('Authorization');
        
        if (!authHeader) {
            return {
                success: false,
                response: NextResponse.json(
                    { error: 'Unauthorized: No authorization header' },
                    { status: 401 }
                )
            };
        }

        if (!authHeader.startsWith('Bearer ')) {
            return {
                success: false,
                response: NextResponse.json(
                    { error: 'Unauthorized: Invalid authorization format. Use: Bearer <token>' },
                    { status: 401 }
                )
            };
        }

        const token = authHeader.replace('Bearer ', '');
        
        if (!token) {
            return {
                success: false,
                response: NextResponse.json(
                    { error: 'Unauthorized: Token is empty' },
                    { status: 401 }
                )
            };
        }

        // Verify the token with Firebase Admin
        const decodedToken = await adminAuth().verifyIdToken(token);
        
        return {
            success: true,
            user: decodedToken
        };

    } catch (error) {
        console.error('Auth validation error:', error);
        
        return {
            success: false,
            response: NextResponse.json(
                { error: 'Unauthorized: Invalid or expired token' },
                { status: 401 }
            )
        };
    }
}

/**
 * Higher-order function to wrap API handlers with authentication
 * 
 * Usage:
 * ```
 * export const GET = withAuth(async (req, user) => {
 *   // user is the decoded Firebase token
 *   return NextResponse.json({ data: 'protected' });
 * });
 * ```
 */
export function withAuth(
    handler: (req: NextRequest, user: DecodedIdToken) => Promise<NextResponse>
) {
    return async (req: NextRequest): Promise<NextResponse> => {
        const authResult = await validateAuth(req);
        
        if (!authResult.success) {
            return authResult.response;
        }
        
        return handler(req, authResult.user);
    };
}
